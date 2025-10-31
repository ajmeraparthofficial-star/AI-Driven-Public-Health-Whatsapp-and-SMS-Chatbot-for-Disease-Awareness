// FIX: Create content for the missing types.ts file. This resolves module import errors across the application.

export enum Page {
    PROFILE = 'PROFILE',
    REPORTS = 'REPORTS',
    HEALTH_CHECKUP = 'HEALTH_CHECKUP',
    VACCINATION = 'VACCINATION',
    TRACKER = 'TRACKER',
    HEALTH_CENTERS = 'HEALTH_CENTERS',
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // Only used for signup, not stored in state
    dob?: string;
    bloodGroup?: string;
    avatarUrl?: string;
}

export enum MessageSender {
    USER = 'USER',
    AI = 'AI',
}

export interface ChatMessage {
    sender: MessageSender;
    text: string;
    timestamp: Date;
    imageUrl?: string;
}

export interface MedicalReport {
    id: string;
    title: string;
    date: string;
    fileUrl: string;
    fileName: string;
}

export interface DiseaseData {
    state: string;
    diseases: {
        [key: string]: number;
    };
}