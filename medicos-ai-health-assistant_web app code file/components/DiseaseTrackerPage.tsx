import React, { useState, useEffect } from 'react';
import { Page, DiseaseData } from '../types';
import { ArrowLeftIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { getDiseaseData } from '../services/diseaseTrackerService';
import { generatePrecautions, getRealtimeDiseaseAlerts } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';

interface DiseaseTrackerPageProps {
  setPage: (page: Page) => void;
}

const DiseaseTrackerPage: React.FC<DiseaseTrackerPageProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const [diseaseData, setDiseaseData] = useState<DiseaseData[]>([]);
    const [selectedState, setSelectedState] = useState<DiseaseData | null>(null);
    const [precautions, setPrecautions] = useState<string>('');
    const [isLoadingPrecautions, setIsLoadingPrecautions] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // State for real-time alerts
    const [alertLocation, setAlertLocation] = useState('');
    const [userCoords, setUserCoords] = useState<{ latitude: number, longitude: number } | null>(null);
    const [alertResult, setAlertResult] = useState<{ text: string; groundingMetadata: any } | null>(null);
    const [isAlertLoading, setIsAlertLoading] = useState(false);
    const [locationError, setLocationError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingData(true);
            const data = await getDiseaseData();
            // Sort data alphabetically by state name
            const sortedData = [...data].sort((a, b) => a.state.localeCompare(b.state));
            setDiseaseData(sortedData);
            setIsLoadingData(false);
        };
        fetchData();
    }, []);

    const handleStateClick = (stateName: string) => {
        const state = diseaseData.find(d => d.state === stateName);
        setSelectedState(state || null);
        setPrecautions(''); // Clear precautions when a new state is selected
    };
    
    const handleDiseaseClick = async (diseaseName: string) => {
        setIsLoadingPrecautions(true);
        setPrecautions('');
        const generatedPrecautions = await generatePrecautions(diseaseName);
        setPrecautions(generatedPrecautions);
        setIsLoadingPrecautions(false);
    };

    const handleGetUserLocation = () => {
        setLocationError('');
        setAlertLocation('');
        setUserCoords(null);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserCoords({ latitude, longitude });
                    setAlertLocation('My Current Location');
                },
                (error) => {
                    setLocationError('Unable to retrieve your location. Please check browser permissions.');
                    console.error("Geolocation error:", error);
                }
            );
        } else {
            setLocationError('Geolocation is not supported by this browser.');
        }
    };

    const handleCheckAlerts = async () => {
        if (!alertLocation && !userCoords) return;
        setIsAlertLoading(true);
        setAlertResult(null);
        setLocationError('');
        const locationQuery = userCoords ? userCoords : alertLocation;
        const result = await getRealtimeDiseaseAlerts(locationQuery);
        setAlertResult(result);
        setIsAlertLoading(false);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-950 min-h-full pb-20">
            <div className="max-w-7xl mx-auto">
                <header className="flex items-center mb-6">
                    <button onClick={() => setPage(Page.PROFILE)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-3 interactive-press">
                        <ArrowLeftIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('tracker_title')}</h1>
                </header>
                
                {isLoadingData ? (
                    <div className="text-center p-8 dark:text-gray-400">{t('loading')}</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg">
                           <h2 className="text-xl font-bold mb-4 dark:text-white">{t('tracker_select_state_list')}</h2>
                           <div className="max-h-[500px] overflow-y-auto pr-2">
                               <ul className="space-y-2">
                                   {diseaseData.map(stateData => (
                                       <li key={stateData.state}>
                                           <button
                                               onClick={() => handleStateClick(stateData.state)}
                                               className={`w-full text-left p-3 rounded-lg transition-colors duration-200 interactive-press ${
                                                   selectedState?.state === stateData.state
                                                   ? 'bg-blue-600 text-white shadow'
                                                   : 'bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700'
                                               }`}
                                           >
                                               <span className="font-semibold">{stateData.state}</span>
                                           </button>
                                       </li>
                                   ))}
                               </ul>
                           </div>
                        </div>

                        <div className="lg:col-span-2 space-y-4">
                            {selectedState ? (
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg animate-fade-in-up">
                                    <h2 className="text-2xl font-bold mb-3 dark:text-white">{selectedState.state}</h2>
                                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                        {Object.entries(selectedState.diseases).map(([name, count]) => (
                                            <li key={name} className="flex justify-between items-center py-1">
                                                <span>{name}: <strong>{count}</strong> {t('tracker_map_cases')}</span>
                                                <button onClick={() => handleDiseaseClick(name)} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900 interactive-press">
                                                    {t('tracker_get_precautions')}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center text-gray-500 dark:text-gray-400">
                                    <p>{t('tracker_select_state')}</p>
                                </div>
                            )}

                            {isLoadingPrecautions ? (
                                 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg animate-fade-in-up dark:text-gray-300">{t('loading')}</div>
                            ) : precautions && (
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg animate-fade-in-up">
                                    <h3 className="font-bold mb-2 text-lg dark:text-white">{t('tracker_health_precautions')}</h3>
                                    <div className="text-sm prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: precautions.replace(/\n/g, '<br />').replace(/\* /g, '<span class="mr-2">•</span>') }} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('tracker_realtime_alerts')}</h2>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <input 
                            type="text"
                            className="flex-grow w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder={t('tracker_enter_location')}
                            value={alertLocation}
                            onChange={(e) => {
                                setAlertLocation(e.target.value);
                                if (userCoords) setUserCoords(null);
                            }}
                            disabled={isAlertLoading}
                        />
                        <button 
                            onClick={handleGetUserLocation}
                            disabled={isAlertLoading}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:bg-gray-200 disabled:cursor-not-allowed interactive-press"
                        >
                            <MapPinIcon className="h-5 w-5" />
                            {t('tracker_use_my_location')}
                        </button>
                    </div>
                    {locationError && <p className="text-red-500 text-sm mt-2">{locationError}</p>}
                    <div className="mt-4">
                        <button
                            onClick={handleCheckAlerts}
                            disabled={isAlertLoading || !alertLocation}
                            className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 interactive-press"
                        >
                            {isAlertLoading ? t('tracker_checking') : t('tracker_check_alerts')}
                        </button>
                    </div>

                    {isAlertLoading && <div className="mt-4 text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg dark:text-gray-300">{t('tracker_checking')}...</div>}
                    
                    {alertResult && (
                        <div className="mt-6 p-4 border border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg animate-fade-in-up">
                            <h3 className="font-bold text-yellow-800 dark:text-yellow-300">{t('tracker_alerts_for_area')}</h3>
                            <p className="mt-2 text-sm text-yellow-900 dark:text-yellow-200" style={{ whiteSpace: 'pre-wrap' }}>{alertResult.text}</p>
                            {alertResult.groundingMetadata?.groundingChunks?.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-semibold text-xs text-yellow-800 dark:text-yellow-300 uppercase">{t('tracker_sources')}</h4>
                                    <ul className="list-disc list-inside text-sm mt-1">
                                        {alertResult.groundingMetadata.groundingChunks.map((chunk: any, index: number) => {
                                            const source = chunk.web || chunk.maps;
                                            if (source && source.uri) {
                                                return (
                                                    <li key={index} className="truncate">
                                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-yellow-700 dark:text-yellow-400 hover:underline">
                                                            {source.title || source.uri}
                                                        </a>
                                                    </li>
                                                );
                                            }
                                            return null;
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiseaseTrackerPage;