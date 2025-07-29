import { GoogleGenAI } from "@google/genai";

// This file centralizes the initialization of the GoogleGenAI client.
// It relies on the API_KEY environment variable being available in the execution context,
// as configured in a deployment environment like Vercel.
// As per the instructions, we must assume process.env.API_KEY is available and secure.

export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
