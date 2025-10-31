import { DiseaseAlert } from './services/alertService';

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  image?: string; // To hold base64 image data for handwritten input
  alerts?: DiseaseAlert[]; // To hold structured alert data
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  greeting: string;
}

export type AppState = 'consent' | 'initialInput' | 'languageConfirmation' | 'languageSelection' | 'chatting';
