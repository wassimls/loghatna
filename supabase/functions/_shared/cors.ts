// This file configures the Cross-Origin Resource Sharing (CORS) headers.
// These headers are essential for allowing your web application (frontend)
// to communicate with your Supabase Edge Function from a different origin (domain).

export const corsHeaders = {
  // Allows requests from any origin. For production, you should restrict this
  // to your specific application's domain for better security.
  // Example for production: 'Access-Control-Allow-Origin': 'https://your-app-domain.com'
  'Access-Control-Allow-Origin': '*',

  // Specifies the headers that are allowed in the actual request from the client.
  // These are standard headers used by Supabase's client libraries and fetch requests.
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
