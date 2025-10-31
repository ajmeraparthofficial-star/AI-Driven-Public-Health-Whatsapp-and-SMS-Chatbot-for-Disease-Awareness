
import React, { useState } from 'react';
import { useRecordVoice } from '../hooks/useRecordVoice';
import { HandwritingCanvas } from './HandwritingCanvas';

interface ChatInputProps {
  onSendMessage: (text: string, image?: string) => void;
  isLoading: boolean;
  languageCode: string;
}

const SendIcon = () => (
    <svg xmlns="http://www.w.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.54l3.853-1.414a.75.75 0 000-1.414L3.23 4.711a.75.75 0 00-.95-.826zM5.503 9.42a.75.75 0 00.54.95l4.95 1.414a.75.75 0 00.95-.826L10.48 5.23a.75.75 0 00-1.414 0L5.23 10.48a.75.75 0 00-.826.95z" />
        <path d="M9.42 5.503a.75.75 0 00-.95-.54l-4.95 1.414a.75.75 0 00-.826.95L4.71 10.48a.75.75 0 001.414 0L9.97 6.23a.75.75 0 00.826-.95L9.42 5.503z" />
    </svg>
);

const MicIcon = ({ isRecording }: { isRecording: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${isRecording ? 'text-red-500' : 'text-gray-300'}`}>
        <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
        <path d="M5.5 8.5a.5.5 0 01.5.5v1.5a4 4 0 004 4h0a4 4 0 004-4V9a.5.5 0 011 0v1.5a5 5 0 01-5 5h0a5 5 0 01-5-5V9a.5.5 0 01.5-.5z" />
    </svg>
);

const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300">
        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
    </svg>
);


export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, languageCode }) => {
  const [text, setText] = useState('');
  const [isHandwritingModalOpen, setHandwritingModalOpen] = useState(false);
  
  const handleTranscription = (transcribedText: string) => {
    setText(prev => prev + transcribedText);
  };
  
  const { isRecording, toggleRecording, isAvailable } = useRecordVoice(languageCode, handleTranscription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleSendHandwriting = (imageData: string) => {
    onSendMessage('', imageData);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as any);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your symptoms or question..."
          className="flex-1 p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none resize-none"
          rows={1}
          disabled={isLoading}
        />
        {isAvailable && (
          <button
            type="button"
            onClick={toggleRecording}
            disabled={isLoading}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            className={`p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/20' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            <MicIcon isRecording={isRecording} />
          </button>
        )}
        <button
            type="button"
            onClick={() => setHandwritingModalOpen(true)}
            disabled={isLoading}
            aria-label="Open handwriting canvas"
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
        >
            <PencilIcon />
        </button>
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="p-2 bg-pink-600 text-white rounded-full disabled:bg-pink-800 disabled:cursor-not-allowed hover:bg-pink-500 transition-colors"
        >
          <SendIcon />
        </button>
      </form>
      <HandwritingCanvas
        isOpen={isHandwritingModalOpen}
        onClose={() => setHandwritingModalOpen(false)}
        onSend={handleSendHandwriting}
      />
    </>
  );
};