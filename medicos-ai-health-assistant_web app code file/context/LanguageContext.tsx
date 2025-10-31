import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { translations } from '../i18n/translations';

export type Language = keyof typeof translations;

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, replacements?: { [key: string]: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && translations[savedLanguage]) {
            return savedLanguage;
        }
        // Detect browser language
        const browserLang = navigator.language.split('-')[0] as Language;
        return translations[browserLang] ? browserLang : 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);
    
    const t = useCallback((key: string, replacements: { [key: string]: string } = {}): string => {
        // Fallback chain: Selected Language -> English -> Key
        let translation = (translations[language] && translations[language][key]) 
                          || translations['en'][key] 
                          || key;
        
        Object.keys(replacements).forEach(placeholder => {
            const regex = new RegExp(`{${placeholder}}`, 'g');
            translation = translation.replace(regex, replacements[placeholder]);
        });

        return translation;
    }, [language]);

    const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};