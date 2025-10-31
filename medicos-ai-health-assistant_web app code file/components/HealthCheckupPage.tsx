import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Page, ChatMessage, MessageSender } from '../types';
import { 
    ArrowLeftIcon, PaperAirplaneIcon, QuestionMarkCircleIcon, BeakerIcon, 
    HeartIcon, SparklesIcon, PaperClipIcon, MicrophoneIcon, XCircleIcon 
} from '@heroicons/react/24/solid';
import { createChatSession, sendMessageToChat } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';
import { Chat } from '@google/genai';
import StethoscopeIcon from './icons/StethoscopeIcon';
import { AuthContext } from '../context/AuthContext';


interface HealthCheckupPageProps {
  setPage: (page: Page) => void;
}

// Extend the window interface for SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const HealthCheckupPage: React.FC<HealthCheckupPageProps> = ({ setPage }) => {
    const { language, t } = useLanguage();
    const auth = useContext(AuthContext);
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // New state for attachments and voice
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<any>(null);

    const promptSuggestions = [
        { icon: QuestionMarkCircleIcon, title: t('checkup_suggestion_term'), prompt: 'What is hypertension?' },
        { icon: BeakerIcon, title: t('checkup_suggestion_symptom'), prompt: 'What are the common causes of a persistent headache?' },
        { icon: HeartIcon, title: t('checkup_suggestion_fitness'), prompt: 'Can you suggest some light exercises for a beginner?' },
        { icon: SparklesIcon, title: t('checkup_suggestion_diet'), prompt: 'What are some heart-healthy foods I can include in my diet?' },
    ];

    const initializeChat = useCallback(() => {
        try {
            const languageName = new Intl.DisplayNames(['en'], { type: 'language' }).of(language) || 'English';
            const newChat = createChatSession(languageName);
            setChatSession(newChat);
            setHistory([]);
        } catch (error) {
            console.error("Failed to initialize chat:", error);
            setHistory([{ sender: MessageSender.AI, text: "Error: Could not initialize AI chat. Please ensure your API key is set up correctly.", timestamp: new Date() }]);
        }
    }, [language]);

    useEffect(() => {
        initializeChat();

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setUserInput(prev => prev ? `${prev} ${transcript}` : transcript);
            };

            recognition.onerror = (event: any) => console.error("Speech recognition error", event.error);
            recognition.onend = () => setIsRecording(false);
            
            recognitionRef.current = recognition;
        }
    }, [initializeChat]);
    
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [history]);
    
    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = language;
        }
    }, [language]);

    const fileToBase64 = (file: File): Promise<string> => 
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
      });

    const removeAttachment = () => {
        setAttachedFile(null);
        setFilePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSend = async (messageToSend?: string) => {
        const message = messageToSend || userInput;
        if ((message.trim() === '' && !attachedFile) || isLoading || !chatSession) return;
        
        const userMessage: ChatMessage = { sender: MessageSender.USER, text: message, timestamp: new Date(), imageUrl: filePreview };
        setHistory(prev => [...prev, userMessage]);
        
        setUserInput('');
        setIsLoading(true);

        let filePart;
        if (attachedFile) {
            try {
                const base64Data = await fileToBase64(attachedFile);
                filePart = { inlineData: { data: base64Data, mimeType: attachedFile.type } };
            } catch (error) {
                console.error("Error converting file to Base64:", error);
                const errorMessage: ChatMessage = { sender: MessageSender.AI, text: "Sorry, I couldn't process your file. Please try again.", timestamp: new Date() };
                setHistory(prev => [...prev, errorMessage]);
                setIsLoading(false);
                removeAttachment();
                return;
            }
        }
        
        removeAttachment();

        try {
            const aiResponse = await sendMessageToChat(chatSession, message, filePart);
            setHistory(prev => [...prev, aiResponse]);
        } catch (error) {
            const errorMessage: ChatMessage = { sender: MessageSender.AI, text: "Sorry, I couldn't process that. Please try again.", timestamp: new Date() };
            setHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setAttachedFile(file);
            setFilePreview(URL.createObjectURL(file));
        } else if (file) {
            alert("Please select an image file.");
        }
    };

    const handleMicClick = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }
        if (isRecording) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    return (
        <div className="flex-grow flex flex-col bg-gray-50 dark:bg-gray-950 h-full">
            <header className="flex items-center p-4 bg-white dark:bg-gray-800 shadow-md z-10 flex-shrink-0">
                <button onClick={() => setPage(Page.PROFILE)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-3 interactive-press">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </button>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">{t('checkup_title')}</h1>
            </header>
            
            <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
                {history.length === 0 && !isLoading ? (
                    <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 h-full p-4">
                         <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">{t('checkup_how_can_i_help')}</h2>
                            <p className="mt-1">{t('checkup_suggestion_prompt')}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                           {promptSuggestions.map((suggestion) => (
                                <button
                                    key={suggestion.title}
                                    onClick={() => handleSend(suggestion.prompt)}
                                    className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg hover:ring-2 hover:ring-blue-500 dark:hover:bg-gray-700/60 transition-all duration-200 text-left flex flex-col items-start interactive-press"
                                >
                                    <suggestion.icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{suggestion.title}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {history.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.sender === MessageSender.USER ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                                {msg.sender === MessageSender.AI && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-1 flex-shrink-0">
                                        <StethoscopeIcon className="w-5 h-5 text-gray-500" />
                                    </div>
                                )}
                                <div className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-2 rounded-2xl ${msg.sender === MessageSender.USER ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm'}`}>
                                    {msg.imageUrl && msg.sender === MessageSender.USER && (
                                        <img src={msg.imageUrl} alt="User attachment" className="mb-2 rounded-lg max-w-full h-auto" />
                                    )}
                                    {msg.text && <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>}
                                </div>
                                 {msg.sender === MessageSender.USER && auth?.user?.avatarUrl && (
                                    <img src={auth.user.avatarUrl} alt="You" className="w-8 h-8 rounded-full ml-1 flex-shrink-0" />
                                )}
                            </div>
                        ))}
                    </>
                )}
                 {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-1 flex-shrink-0">
                            <StethoscopeIcon className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="px-4 py-2 rounded-2xl bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

             <div className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex-shrink-0">
                {filePreview && (
                    <div className="relative inline-block mb-2 p-1 border dark:border-gray-600 rounded-lg">
                        <img src={filePreview} alt="File preview" className="w-20 h-20 rounded object-cover" />
                        <button onClick={removeAttachment} className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full interactive-press">
                            <XCircleIcon className="w-6 h-6" />
                        </button>
                    </div>
                )}
                <div className="flex items-center space-x-2">
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full interactive-press">
                        <PaperClipIcon className="h-6 w-6" />
                    </button>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t('checkup_input_placeholder')}
                        className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        disabled={isLoading}
                    />
                    <button onClick={handleMicClick} className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-full interactive-press">
                        <MicrophoneIcon className={`h-6 w-6 transition-colors ${isRecording ? 'text-red-500' : ''}`} />
                    </button>
                    <button onClick={() => handleSend()} disabled={isLoading || (userInput.trim() === '' && !attachedFile)} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 dark:hover:bg-blue-500 disabled:bg-gray-400 transition-colors interactive-press">
                        <PaperAirplaneIcon className="h-6 w-6" />
                    </button>
                </div>
                 <div className="flex justify-center gap-4 text-sm mt-3 text-gray-500 dark:text-gray-400">
                    <a href="https://wa.me/qr/RBUYERILUY3TA1" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">{t('checkup_whatsapp_bot')}</a>
                    <span>|</span>
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">{t('checkup_sms_bot')}</a>
                </div>
            </div>
        </div>
    );
};

export default HealthCheckupPage;
