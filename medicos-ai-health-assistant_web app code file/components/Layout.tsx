import React from 'react';
import { Page } from '../types';
import { UserIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon, GlobeAltIcon, MapIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
    children: React.ReactNode;
    activePage: Page;
    setPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setPage }) => {
    const { t } = useLanguage();
    
    const navItems = [
        { page: Page.PROFILE, label: t('nav_profile'), icon: UserIcon },
        { page: Page.REPORTS, label: t('nav_reports'), icon: DocumentTextIcon },
        { page: Page.HEALTH_CHECKUP, label: t('nav_checkup'), icon: ChatBubbleLeftRightIcon },
        { page: Page.VACCINATION, label: t('nav_vaccine'), icon: ShieldCheckIcon },
        { page: Page.TRACKER, label: t('nav_tracker'), icon: GlobeAltIcon },
        { page: Page.HEALTH_CENTERS, label: t('nav_health_centers'), icon: MapIcon },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
            <main className="flex-grow pb-24 flex flex-col">
                {children}
            </main>
            <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
                <nav className="flex justify-around max-w-lg mx-auto p-1">
                    {navItems.map(item => (
                        <button
                            key={item.page}
                            onClick={() => setPage(item.page)}
                            className={`flex flex-col items-center justify-center w-full py-2 px-1 text-xs sm:text-sm transition-all duration-200 interactive-press rounded-lg ${
                                activePage === item.page
                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-gray-700'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                            }`}
                        >
                            <item.icon className="h-6 w-6 mb-1" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </footer>
        </div>
    );
};

export default Layout;
