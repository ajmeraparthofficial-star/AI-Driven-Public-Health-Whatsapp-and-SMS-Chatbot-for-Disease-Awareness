import React, { useState } from 'react';
import { Page } from '../types';
import { ArrowLeftIcon, MapPinIcon, BuildingOffice2Icon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { findNearbyHealthCenters } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';

interface HealthCentersPageProps {
  setPage: (page: Page) => void;
}

const HealthCentersPage: React.FC<HealthCentersPageProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [centers, setCenters] = useState<any[] | null>(null);

    const handleFindCenters = () => {
        setIsLoading(true);
        setError('');
        setCenters(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const result = await findNearbyHealthCenters({ latitude, longitude });
                    const mapChunks = result.groundingMetadata?.groundingChunks?.filter((c: any) => c.maps) || [];
                    setCenters(mapChunks);
                } catch (err) {
                    setError(t('health_centers_error'));
                } finally {
                    setIsLoading(false);
                }
            },
            () => {
                setError(t('health_centers_error'));
                setIsLoading(false);
            }
        );
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-6">
                    <button onClick={() => setPage(Page.PROFILE)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-3 interactive-press">
                        <ArrowLeftIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('health_centers_title')}</h1>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 text-center">
                    <MapPinIcon className="w-16 h-16 mx-auto text-cyan-600 dark:text-cyan-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{t('health_centers_intro')}</p>
                    <button
                        onClick={handleFindCenters}
                        disabled={isLoading}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 dark:hover:bg-cyan-500 disabled:bg-gray-400 interactive-press"
                    >
                        {isLoading ? t('health_centers_finding') : t('health_centers_find_button')}
                    </button>
                </div>

                {isLoading && (
                    <div className="text-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">{t('health_centers_finding')}</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">
                        {error}
                    </div>
                )}
                
                {centers && centers.length === 0 && !isLoading && (
                    <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg text-center">
                        {t('health_centers_no_results')}
                    </div>
                )}

                {centers && centers.length > 0 && (
                    <div className="space-y-4">
                        {centers.map((center, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between animate-fade-in-up">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300">
                                        <BuildingOffice2Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{center.maps.title}</h3>
                                    </div>
                                </div>
                                <a 
                                    href={center.maps.uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 interactive-press"
                                >
                                    <span>{t('health_centers_navigate')}</span>
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthCentersPage;