
import React from 'react';

interface TypingIndicatorProps {
    showIcon: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ showIcon }) => {
    return (
        <div className="flex items-center justify-start">
            <div className="flex items-start max-w-xs md:max-w-md lg:max-w-2xl">
                {showIcon && (
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
                            <path fillRule="evenodd" d="M11.25 5.5a.75.75 0 01.75.75V8.5h2.5a.75.75 0 010 1.5h-2.5V12.5a.75.75 0 01-1.5 0v-2.5H8.5a.75.75 0 010-1.5h2.5V6.25a.75.75 0 01.75-.75z" clipRule="evenodd" />
                            <path d="M6.01 2.59A8.353 8.353 0 0110 2c3.245 0 6.095 1.833 7.49 4.506A8.34 8.34 0 0118 10a8.34 8.34 0 01-.51 3.494A8.354 8.354 0 0110 18c-3.245 0-6.095-1.833-7.49-4.506A8.34 8.34 0 012 10a8.34 8.34 0 01.51-3.494A8.353 8.353 0 016.01 2.59zM10 4a6.353 6.353 0 00-4.634 2.083 6.339 6.339 0 00-1.283 4.411A6.353 6.353 0 0010 16a6.353 6.353 0 004.634-2.083 6.339 6.339 0 001.283-4.411A6.353 6.353 0 0010 4z" />
                        </svg>
                    </div>
                )}
                <div className={`bg-[#2a2a2a] rounded-lg p-3 flex items-center space-x-1 ${!showIcon && 'ml-10'}`}>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                </div>
            </div>
        </div>
    );
};