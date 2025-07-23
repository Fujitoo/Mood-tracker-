
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
if (!process.env.API_KEY) {
  // In a real app, you might have a more robust way to handle this,
  // but for this context, we'll throw an error.
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Gets a supportive and reflective insight from the Gemini model based on a journal entry.
 * @param journalText The user's journal entry.
 * @returns A promise that resolves to a string containing the AI's insight.
 */
export const getSupportiveInsight = async (journalText: string): Promise<string> => {
  try {
    const systemInstruction = `You are an empathetic and supportive AI friend. Your role is to read a user's journal entry and provide a short, kind, and reflective comment. 
    Do not give advice, especially not medical advice. Keep your response to 1-2 sentences. 
    Focus on validating their feelings and offering a gentle, positive, or thoughtful perspective. 
    For example, if they are happy, celebrate with them. If they are sad, offer a message of comfort.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: journalText,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
            topP: 1,
            topK: 32,
        }
    });
    
    return response.text;
  } catch (error) {
    console.error('Error fetching insight from Gemini API:', error);
    // Return a graceful fallback message
    return "Couldn't generate an insight at this moment, but your feelings are valid and heard.";
  }
};
