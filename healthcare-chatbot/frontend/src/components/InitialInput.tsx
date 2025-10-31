import React, { useState } from 'react';
import { TypingIndicator } from './TypingIndicator';

interface InitialInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.54l3.853-1.414a.75.75 0 000-1.414L3.23 4.711a.75.75 0 00-.95-.826zM5.503 9.42a.75.75 0 00.54.95l4.95 1.414a.75.75 0 00.95-.826L10.48 5.23a.75.75 0 00-1.414 0L5.23 10.48a.75.75 0 00-.826.95z" />
        <path d="M9.42 5.503a.75.75 0 00-.95-.54l-4.95 1.414a.75.75 0 00-.826.95L4.71 10.48a.75.75 0 001.414 0L9.97 6.23a.75.75 0 00.826-.95L9.42 5.503z" />
    </svg>
);


export const InitialInput: React.FC<InitialInputProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text);
      // Don't clear text, to show the user what they sent
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full text-center">
      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-2 text-pink-400">Welcome!</h2>
        <p className="text-gray-400 mb-6">How can I help you today? Please type your question below in any language.</p>
        
        {isLoading ? (
            <div className="py-4">
                <p className="text-gray-400 mb-4">Detecting language...</p>
                <TypingIndicator showIcon={false} />
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="e.g., Hello, नमस्ते, வணக்கம்..."
                    className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    disabled={isLoading}
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={isLoading || !text.trim()}
                    className="p-3 bg-pink-600 text-white rounded-lg disabled:bg-pink-800 disabled:cursor-not-allowed hover:bg-pink-500 transition-colors"
                >
                    <SendIcon />
                </button>
            </form>
        )}
      </div>
    </div>
  );
};
