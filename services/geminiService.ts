import { GoogleGenAI, Type } from "@google/genai";
import { COURSES } from '../constants';
import { PathfinderResponse } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getCareerPathAdvice = async (userInterest: string): Promise<PathfinderResponse> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock response.");
    // Fallback for demo purposes if key is missing in some environments
    return {
      recommendedCourseIds: ['full-stack', 'ai-gen'],
      reasoning: "API Key missing. Showing default recommendation for Development and AI.",
      careerPath: "Full Stack Developer -> AI Engineer"
    };
  }

  const courseCatalog = COURSES.map(c => `${c.id}: ${c.title} (${c.category}) - ${c.description}`).join('\n');

  const prompt = `
    You are an expert academic advisor for a futuristic tech institute called NeoLearn.
    
    Our Course Catalog:
    ${courseCatalog}

    User's Interest Statement: "${userInterest}"

    Based on the user's interest, recommend up to 2 specific courses from our catalog.
    Explain why you chose them and suggest a potential career title.
    
    Return the response in strict JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedCourseIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of course IDs (e.g. 'ai-gen', 'full-stack')"
            },
            reasoning: {
              type: Type.STRING,
              description: "A short paragraph explaining the choice to the user."
            },
            careerPath: {
              type: Type.STRING,
              description: "A cool, futuristic job title (e.g. 'Neural Interface Architect')"
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as PathfinderResponse;
    }
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      recommendedCourseIds: [],
      reasoning: "I'm having trouble connecting to the neural network right now. Please try again later.",
      careerPath: "Future Technologist"
    };
  }
};