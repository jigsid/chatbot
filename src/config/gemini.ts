import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI client with a fallback API key
// In production, this should be set in the environment variables
const API_KEY = process.env.GEMINI_API_KEY || 'your_gemini_api_key_here';

export const genAI = new GoogleGenerativeAI(API_KEY);

// Get the Gemini model
export const getGeminiModel = (modelName = 'gemini-1.5-flash') => {
  return genAI.getGenerativeModel({ model: modelName });
};

// Create a chat session
export const startGeminiChat = (
  initialHistory: Array<{ role: string; parts: Array<{ text: string }> }> = [],
  temperature = 0.7
) => {
  const model = getGeminiModel();
  return model.startChat({
    history: initialHistory,
    generationConfig: {
      temperature,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
  });
}; 