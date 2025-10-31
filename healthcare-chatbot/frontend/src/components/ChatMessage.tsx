import React from 'react';
import { Message } from '../types';
import { AlertsDisplay } from './AlertsDisplay';

interface ChatMessageProps {
  message: Message;
}

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-pink-500 flex-shrink-0 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.095a1.23 1.23 0 00.41-1.412A9.995 9.995 0 0010 12c-2.31 0-4.438.784-6.131 2.095z" />
        </svg>
    </div>
);

const BotIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
            <path fillRule="evenodd" d="M11.25 5.5a.75.75 0 01.75.75V8.5h2.5a.75.75 0 010 1.5h-2.5V12.5a.75.75 0 01-1.5 0v-2.5H8.5a.75.75 0 010-1.5h2.5V6.25a.75.75 0 01.75-.75z" clipRule="evenodd" />
            <path d="M6.01 2.59A8.353 8.353 0 0110 2c3.245 0 6.095 1.833 7.49 4.506A8.34 8.34 0 0118 10a8.34 8.34 0 01-.51 3.494A8.354 8.354 0 0110 18c-3.245 0-6.095-1.833-7.49-4.506A8.34 8.34 0 012 10a8.34 8.34 0 01.51-3.494A8.353 8.353 0 016.01 2.59zM10 4a6.353 6.353 0 00-4.634 2.083 6.339 6.339 0 00-1.283 4.411A6.353 6.353 0 0010 16a6.353 6.353 0 004.634-2.083 6.339 6.339 0 001.283-4.411A6.353 6.353 0 0010 4z" />
        </svg>
    </div>
);

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const messageAlignment = isUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isUser ? 'bg-pink-600' : 'bg-[#2a2a2a]';
  const textContainerOrder = isUser ? 'order-1' : 'order-2';
  const iconOrder = isUser ? 'order-2 ml-2' : 'order-1 mr-2';

  return (
    <div className={`flex items-start ${messageAlignment}`}>
      <div className={`flex items-start max-w-xs md:max-w-md lg:max-w-2xl`}>
         <div className={iconOrder}>
            {isUser ? <UserIcon /> : <BotIcon />}
         </div>
         <div className={`${bubbleColor} rounded-lg p-3 text-white ${textContainerOrder}`}>
            {message.image && (
              <img 
                src={message.image} 
                alt="Handwritten input" 
                className="rounded-md mb-2 bg-white p-1 max-w-full h-auto" 
              />
            )}
            {message.text && <p className="text-sm whitespace-pre-wrap">{message.text}</p>}
            {message.alerts && message.alerts.length > 0 && (
              <AlertsDisplay alerts={message.alerts} />
            )}
         </div>
      </div>
    </div>
  );
};