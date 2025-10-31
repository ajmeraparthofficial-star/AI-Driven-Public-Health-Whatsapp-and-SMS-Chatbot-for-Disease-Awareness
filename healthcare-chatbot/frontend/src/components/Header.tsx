import React from 'react';

const LogoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-pink-500">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
    </svg>
);

const NewChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M15.28 4.72a.75.75 0 010 1.06l-6.25 6.25a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 011.06-1.06L8.5 10.44l5.72-5.72a.75.75 0 011.06 0zM4.5 1.5a.75.75 0 00-.75.75v14.5a.75.75 0 00.75.75h11a.75.75 0 00.75-.75V8.162a4.502 4.502 0 01-1.5-.666V16H5V2h8.162a4.503 4.503 0 01-.666-1.5H4.5z" />
    </svg>
);


interface HeaderProps {
    onClearHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClearHistory }) => {
  return (
    <header className="p-4 bg-[#1a1a1a] border-b border-pink-500/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <LogoIcon />
            <div>
                <h1 className="text-xl font-bold text-pink-400">AI Public Health Chatbot</h1>
                <p className="text-xs text-gray-400">Bridging the Healthcare Gap in India</p>
            </div>
        </div>
        <button
            onClick={onClearHistory}
            title="Start New Chat"
            className="flex items-center space-x-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-sm text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
        >
            <NewChatIcon />
            <span>New Chat</span>
        </button>
    </header>
  );
};