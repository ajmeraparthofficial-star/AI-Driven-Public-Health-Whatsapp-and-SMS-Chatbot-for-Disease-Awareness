// services/geminiService.ts
import { Language, Message } from '../types';
import * as GenAI from '@google/genai';

// Backend API URL
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

// Fallback: Direct Gemini API (for when backend is unavailable)
// Read the key from Vite env (VITE_GEMINI_KEY). Do NOT hard-code secrets in repo.
const GEMINI_API_KEY = (import.meta as any).env?.VITE_GEMINI_KEY || '';
const genAI = new (GenAI as any).GoogleGenerativeAI(GEMINI_API_KEY);

// Generate unique user ID
const getUserId = (): string => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', userId);
  }
  return userId;
};

// Chat interface
export interface Chat {
  sendMessage: (message: string, image?: string) => Promise<{ text: string; alerts?: string[] }>;
}

export const initializeChat = (language: Language, history?: Message[]): Chat => {
  return {
    sendMessage: async (message: string, image?: string) => {
      try {
        // Try backend API first
        const response = await fetch(`${API_BASE_URL}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            language: language.code,
            userId: getUserId(),
            image: image || null,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return {
            text: data.response,
            alerts: data.alerts || [],
          };
        }
        
        // Fallback to direct Gemini API
        console.warn('Backend unavailable, using direct Gemini API');
        return await sendDirectGemini(message, language, image);
        
      } catch (error) {
        console.error('Backend error, falling back to direct API:', error);
        return await sendDirectGemini(message, language, image);
      }
    },
  };
};

// Direct Gemini API call (fallback)
async function sendDirectGemini(
  message: string,
  language: Language,
  image?: string
): Promise<{ text: string; alerts?: string[] }> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    
    const prompt = `You are a healthcare assistant from Matrix Mavericks.
Language: ${language.name}
User Query: ${message}

Provide helpful health advice in ${language.name} within 100 words.
Include disclaimer: "This is not medical advice. Consult a healthcare professional."`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return { text, alerts: [] };
    
  } catch (error) {
    console.error('Gemini error:', error);
    throw new Error('Unable to get response. Please try again.');
  }
}

export const sendMessageToAI = async (
  chat: Chat,
  text: string,
  image?: string
): Promise<{ text: string; alerts?: string[] }> => {
  return chat.sendMessage(text, image);
};

export const detectLanguage = async (text: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/detect-language`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.language || 'en';
    }
  } catch (error) {
    console.error('Language detection failed:', error);
  }
  
  return 'en'; // Fallback
};