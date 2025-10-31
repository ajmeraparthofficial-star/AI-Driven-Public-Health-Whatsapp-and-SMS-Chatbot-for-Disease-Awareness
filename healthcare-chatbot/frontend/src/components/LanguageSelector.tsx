
import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  languages: Language[];
  onSelect: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-full">
      <h2 className="text-2xl font-bold mb-2 text-pink-400">Choose Language</h2>
      <p className="text-gray-400 mb-6 text-center">Please select your preferred language to continue.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-4xl">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang)}
            className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-700 hover:bg-pink-500/10 hover:border-pink-500 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            <span className="block font-semibold text-white">{lang.name}</span>
            <span className="block text-sm text-gray-400">{lang.nativeName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};