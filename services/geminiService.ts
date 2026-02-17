
import { GoogleGenAI, Type } from "@google/genai";

// Standard implementation for Gemini API interaction
const getAIOrchestrator = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getArchitecturalAdvice = async (topic: string) => {
  const ai = getAIOrchestrator();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As a Senior ERP Architect, provide a brief technical strategy for: ${topic}. Focus on multi-tenant ERPNext scalability.`,
      config: {
        systemInstruction: "You are the Lead Architect for Nexus ERP SaaS. Provide concise, expert-level technical advice on infrastructure and multi-tenancy.",
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (err) {
    console.error("AI Architect Error:", err);
    return "Strategic data temporarily unavailable. Check system logs.";
  }
};
