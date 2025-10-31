import React from 'react';
import { Language } from '../types';

interface LanguageConfirmationProps {
  detectedLanguage: Language;
  onConfirm: () => void;
  onReject: () => void;
}

export const LanguageConfirmation: React.FC<LanguageConfirmationProps> = ({ detectedLanguage, onConfirm, onReject }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-full text-center">
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-pink-500/30 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-pink-400">Language Detected</h2>
        <p className="text-gray-300 mb-6">
          It looks like you're speaking{' '}
          <span className="font-semibold text-white">{detectedLanguage.name} ({detectedLanguage.nativeName})</span>.
          <br/>
          Shall we continue in this language?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onReject}
            className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors"
          >
            Choose Other
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-500 transition-colors"
          >
            Yes, Continue
          </button>
        </div>
      </div>
    </div>
  );
};
