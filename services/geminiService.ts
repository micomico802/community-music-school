
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is set in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Practice Idea Generator will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generatePracticeIdea = async (instrument: string, level: string): Promise<string> => {
  if (!API_KEY) {
    return "API Key not configured. Please ask the administrator to set it up.";
  }

  try {
    const prompt = `You are a creative and encouraging music teacher. 
Generate a short, specific, and fun practice idea for a student.
Student's Instrument: ${instrument}
Student's Level: ${level}
The idea should be a single, actionable task. For example: "Try playing the C major scale using only up-strokes." or "Learn the main riff from 'Smoke on the Water' and try to play it at 3 different speeds."
Be concise and inspiring. Do not use markdown.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.8,
          maxOutputTokens: 100,
          thinkingConfig: { thinkingBudget: 0 } // For low latency
        }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error generating practice idea from Gemini:", error);
    return "Could not generate a practice idea at this time. Please try again later.";
  }
};
