declare const Deno: any;

// Deno standard library for serving HTTP requests
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
// Import GoogleGenerativeAI from esm.sh to use the official SDK in Deno
import { GoogleGenAI, GenerateContentResponse } from 'https://esm.sh/@google/genai@1.10.0';
// Import shared CORS headers
import { corsHeaders } from '../_shared/cors.ts';

/**
 * This state is for round-robin key selection.
 * In a serverless environment, this state is not guaranteed to persist across all invocations,
 * but it provides basic load distribution for a single, warm instance.
 * For true global round-robin, an external state store like Supabase tables or Redis would be needed.
 */
let keyIndex = 0;

/**
 * Converts the async stream from the Gemini SDK into a browser-compatible ReadableStream.
 * This allows us to pipe the streaming response directly back to the client.
 * @param {AsyncGenerator<GenerateContentResponse>} generator - The async generator from the SDK.
 * @returns {ReadableStream} A stream that the client's browser can process.
 */
function anAsyncGeneratorToReadableStream(
  generator: AsyncGenerator<GenerateContentResponse>
) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await generator.next();
      if (done) {
        controller.close();
      } else {
        // The SDK chunks already contain the `text` property. We just need to encode it.
        // We'll send it as a simple string chunk. The client will decode it.
        controller.enqueue(encoder.encode(value.text));
      }
    },
  });
}

// Start serving requests
serve(async (req) => {
  // Handle CORS preflight requests immediately.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Get API keys from environment variables (Supabase secrets).
    const geminiApiKeys = Deno.env.get('GEMINI_API_KEYS');
    if (!geminiApiKeys) {
      throw new Error('GEMINI_API_KEYS environment variable not set in Supabase secrets.');
    }
    const keys = geminiApiKeys.split(',').map(k => k.trim()).filter(Boolean);
    if (keys.length === 0) {
      throw new Error('No valid API keys found in GEMINI_API_KEYS.');
    }

    // 2. Select an API key using a simple round-robin strategy.
    const apiKey = keys[keyIndex];
    keyIndex = (keyIndex + 1) % keys.length;

    // 3. Initialize the Gemini AI client with the selected key.
    const ai = new GoogleGenAI({ apiKey });

    // 4. Get the payload (model, contents, config, etc.) from the client's request body.
    const { model, contents, config, stream } = await req.json();
    
    // 5. Call the appropriate Gemini API method based on the client's request.
    if (stream) {
      // Handle streaming requests.
      const responseStream = await ai.models.generateContentStream({
        model,
        contents,
        config,
      });
      
      // Convert the SDK's async generator to a ReadableStream for the browser.
      const readableStream = anAsyncGeneratorToReadableStream(responseStream);
      
      // Return the stream directly to the client.
      return new Response(readableStream, {
        headers: { ...corsHeaders, 'Content-Type': 'text/plain; charset=utf-8' },
      });

    } else {
      // Handle non-streaming (unary) requests.
      const response: GenerateContentResponse = await ai.models.generateContent({
          model,
          contents,
          config,
      });
      
      // The response from the SDK is an object. We stringify it to send back as JSON.
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    // Gracefully handle any errors that occur during the process.
    console.error('Edge Function Error:', error.message);
    const errorMessage = error.message || 'An unknown error occurred in the Edge Function.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});