import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, Language, AppState } from './types';
import { SUPPORTED_LANGUAGES } from './constants';
import { initializeChat, sendMessageToAI, detectLanguage } from './services/geminiService';
import { Chat } from '@google/genai';
import { LanguageSelector } from './components/LanguageSelector';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Header } from './components/Header';
import { TypingIndicator } from './components/TypingIndicator';
import { Disclaimer } from './components/Disclaimer';
import { InitialInput } from './components/InitialInput';
import { LanguageConfirmation } from './components/LanguageConfirmation';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<Language | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appState, setAppState] = useState<AppState>('consent');
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  // Load state from localStorage on initial render
  useEffect(() => {
    const consentGiven = localStorage.getItem('consentGiven') === 'true';
    if (!consentGiven) {
      setAppState('consent');
      return;
    }

    const savedLangString = localStorage.getItem('selectedLanguage');
    const savedHistoryString = localStorage.getItem('chatHistory');

    if (savedLangString && savedHistoryString) {
      try {
        const savedLang = JSON.parse(savedLangString) as Language;
        const savedHistory = JSON.parse(savedHistoryString) as Message[];
        
        if (savedLang && savedHistory.length > 0) {
          setSelectedLanguage(savedLang);
          setMessages(savedHistory);
          // Restore chat session with history
          chatRef.current = initializeChat(savedLang, savedHistory);
          setAppState('chatting');
        } else {
          setAppState('initialInput');
        }
      } catch (error) {
        console.error("Failed to parse chat history:", error);
        setAppState('initialInput');
      }
    } else {
      setAppState('initialInput');
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (appState === 'chatting' && messages.length > 0 && selectedLanguage) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
      localStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage));
    }
  }, [messages, selectedLanguage, appState]);

  const handleLanguageSelect = useCallback((language: Language) => {
    // Clear previous state before starting new chat
    localStorage.removeItem('chatHistory');
    setSelectedLanguage(language);
    chatRef.current = initializeChat(language); // Start new chat without history

    const greetingMessage: Message = {
      id: Date.now(),
      text: language.greeting,
      sender: 'bot',
    };
    setMessages([greetingMessage]);
    setAppState('chatting');
  }, []);

  const handleSendMessage = async (text: string, image?: string) => {
    if ((!text.trim() && !image) || isLoading || !chatRef.current) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      image,
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { text: responseText, alerts } = await sendMessageToAI(chatRef.current, text, image);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        alerts: alerts,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConsent = () => {
    localStorage.setItem('consentGiven', 'true');
    setAppState('initialInput');
  };

  const handleInitialMessage = async (text: string) => {
    if (!text.trim()) return;
    setIsLoading(true);
    try {
      const langCode = await detectLanguage(text);
      const foundLang = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
      if (foundLang) {
        setDetectedLanguage(foundLang);
        setAppState('languageConfirmation');
      } else {
        setAppState('languageSelection');
      }
    } catch (error) {
        console.error("Error during language detection:", error);
        setAppState('languageSelection'); // Fallback to manual selection
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConfirmLanguage = () => {
      if (detectedLanguage) {
          handleLanguageSelect(detectedLanguage);
      }
  };

  const handleRejectLanguage = () => {
      setAppState('languageSelection');
  };
  
  const handleClearHistory = () => {
      localStorage.removeItem('chatHistory');
      localStorage.removeItem('selectedLanguage');
      setMessages([]);
      setSelectedLanguage(null);
      chatRef.current = null;
      setAppState('initialInput');
  };

  const renderContent = () => {
    switch(appState) {
      case 'consent':
        return <Disclaimer onAccept={handleConsent} />;
      case 'initialInput':
        return <InitialInput onSend={handleInitialMessage} isLoading={isLoading} />;
      case 'languageConfirmation':
        return detectedLanguage ? (
            <LanguageConfirmation 
                detectedLanguage={detectedLanguage} 
                onConfirm={handleConfirmLanguage}
                onReject={handleRejectLanguage}
            />
        ) : null;
      case 'languageSelection':
        return <LanguageSelector languages={SUPPORTED_LANGUAGES} onSelect={handleLanguageSelect} />;
      case 'chatting':
        return (
          <>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator showIcon={true}/>}
            <div ref={messagesEndRef} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] font-sans">
      <Header onClearHistory={handleClearHistory} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {renderContent()}
      </div>
      {appState === 'chatting' && selectedLanguage && (
        <div className="p-4 bg-[#1a1a1a] border-t border-pink-500/20">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading} 
            languageCode={selectedLanguage.code} 
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;