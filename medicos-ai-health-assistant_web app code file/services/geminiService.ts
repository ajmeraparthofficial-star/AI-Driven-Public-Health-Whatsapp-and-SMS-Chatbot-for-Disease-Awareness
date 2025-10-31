import { GoogleGenAI, Chat, Part } from "@google/genai";
import { ChatMessage, MessageSender } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const getAiInstance = () => {
    if (!API_KEY) {
        throw new Error("API key is not available.");
    }
    return new GoogleGenAI({ apiKey: API_KEY });
};


export const createChatSession = (language: string): Chat => {
    const ai = getAiInstance();
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are Medicos AI, a compassionate and helpful virtual health assistant. You communicate like a caring doctor. Your primary language is ${language}. Always start your response with a clear disclaimer in bold: '**Disclaimer: I am an AI assistant and not a medical professional. Please consult a qualified doctor for any health concerns.**' After the disclaimer, provide helpful information and precautions based on the user's symptoms or images.`,
        },
    });
};

export const sendMessageToChat = async (
    chat: Chat, 
    message: string, 
    file?: { inlineData: { data: string; mimeType: string; } }
): Promise<ChatMessage> => {
    try {
        const content: Part[] = [];
        
        if (file) {
            content.push(file);
        }
        if (message) {
            content.push({ text: message });
        }
        
        // FIX: The sendMessage method for multimodal content expects a `contents` object, not `message`.
        const response = await chat.sendMessage({ contents: { parts: content } });
        const text = response.text;
        return { sender: MessageSender.AI, text, timestamp: new Date() };
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return { sender: MessageSender.AI, text: "I'm sorry, I encountered an error. Please try again.", timestamp: new Date() };
    }
};

export const generatePrecautions = async (diseaseName: string): Promise<string> => {
    try {
        const ai = getAiInstance();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a concise list of general health precautions to take against ${diseaseName}. Format it as a bulleted list.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating precautions:", error);
        return "Could not generate precautions at this time. Please consult official health sources.";
    }
};

export const getVaccineInfo = async (vaccineName: string): Promise<string> => {
    try {
        const ai = getAiInstance();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Provide a brief, user-friendly description for the "${vaccineName}" vaccine. Include its primary purpose and common, mild side effects. Format it with a short paragraph for the description, followed by a bulleted list for side effects.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating vaccine info:", error);
        return "Could not retrieve information for this vaccine at this time.";
    }
};

export const getRealtimeDiseaseAlerts = async (location: { latitude: number; longitude: number } | string) => {
    const ai = getAiInstance();
    let prompt: string;
    let toolConfig: any = {};

    if (typeof location === 'string') {
        prompt = `Provide a summary of active disease outbreaks and health alerts for ${location}. Include any recent news or official reports.`;
    } else {
        prompt = `Provide a summary of active disease outbreaks and health alerts for my current location. Include any recent news or official reports.`;
        toolConfig.retrievalConfig = { latLng: location };
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                // FIX: Each tool must be a separate object in the array.
                tools: [{ googleMaps: {} }, { googleSearch: {} }],
                toolConfig,
            },
        });
        const text = response.text;
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        return { text, groundingMetadata };
    } catch (error) {
        console.error("Error fetching real-time alerts:", error);
        return { text: "Could not fetch real-time alerts. The API may be unavailable or the location may not be supported. Please try again later.", groundingMetadata: null };
    }
};

export const findNearbyHealthCenters = async (location: { latitude: number; longitude: number }) => {
    const ai = getAiInstance();
    const prompt = 'Find nearby government health centers, public hospitals, and community clinics.';
    const toolConfig = { retrievalConfig: { latLng: location } };

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ googleMaps: {} }],
                toolConfig,
            },
        });
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
        return { groundingMetadata };
    } catch (error) {
        console.error("Error fetching nearby health centers:", error);
        return { groundingMetadata: null };
    }
};
