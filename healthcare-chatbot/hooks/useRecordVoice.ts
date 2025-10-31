
import { useState, useEffect, useRef, useCallback } from 'react';

// FIX: Add type definitions for the experimental SpeechRecognition API and related browser-specific properties.
// This resolves errors about missing properties on `window` and type/value name collisions.
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: (() => void) | null;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionStatic {
  new(): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

// FIX: Rename the constant to `SpeechRecognitionAPI` to avoid shadowing the `SpeechRecognition` type interface.
// Polyfill for browsers that use webkitSpeechRecognition
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

export const useRecordVoice = (languageCode: string, onTranscription: (text: string) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  // FIX: Use the `SpeechRecognition` interface as the type for the ref, which is now possible.
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // FIX: Check for the existence of the renamed constant.
    if (SpeechRecognitionAPI) {
      setIsAvailable(true);
      // FIX: Instantiate using the renamed constant.
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = languageCode;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscription(transcript);
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        // Use a state check to avoid setting state on unmounted component
        // Although with the current logic, onend might not be the primary way state is reset.
        if (recognitionRef.current) {
            setIsRecording(false);
        }
      };

      recognitionRef.current = recognition;
    } else {
      setIsAvailable(false);
      console.warn("Speech Recognition API is not available in this browser.");
    }

    // Cleanup function to stop recognition if component unmounts while recording
    return () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }
  }, [languageCode, onTranscription]);

  const toggleRecording = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch(e) {
        console.error("Could not start recording: ", e);
        setIsRecording(false);
      }
    }
  }, [isRecording]);

  return { isRecording, toggleRecording, isAvailable };
};
