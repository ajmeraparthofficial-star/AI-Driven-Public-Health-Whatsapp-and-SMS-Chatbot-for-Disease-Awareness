import React, { useState } from 'react';
import { Page } from '../types';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getVaccineInfo } from '../services/geminiService';
import { useLanguage } from '../context/LanguageContext';

interface VaccinationPageProps {
  setPage: (page: Page) => void;
}

const VaccinationPage: React.FC<VaccinationPageProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const [vaccine, setVaccine] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isScheduled, setIsScheduled] = useState(false);
    const [vaccineInfo, setVaccineInfo] = useState('');
    const [isLoadingInfo, setIsLoadingInfo] = useState(false);

    const resetForm = () => {
        setVaccine('');
        setDate('');
        setTime('');
        setVaccineInfo('');
        setIsScheduled(false);
    };

    const handleVaccineChange = async (selectedVaccine: string) => {
        setVaccine(selectedVaccine);
        if (selectedVaccine) {
            setIsLoadingInfo(true);
            setVaccineInfo('');
            try {
                const info = await getVaccineInfo(selectedVaccine);
                setVaccineInfo(info);
            } catch (error) {
                console.error(error);
                setVaccineInfo('Could not load vaccine information.');
            } finally {
                setIsLoadingInfo(false);
            }
        } else {
            setVaccineInfo('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (vaccine && date && time) {
            setIsScheduled(true);
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-950 min-h-full">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center mb-6">
                    <button onClick={() => setPage(Page.PROFILE)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-3 interactive-press">
                        <ArrowLeftIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('vaccine_title')}</h1>
                </header>

                {isScheduled ? (
                    <div className="bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800 p-6 rounded-2xl shadow-lg text-center animate-fade-in-up">
                        <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold mb-2 text-green-800 dark:text-green-200">{t('vaccine_appointment_scheduled')}</h2>
                        <p className="text-green-700 dark:text-green-300">{t('vaccine_confirmation', { vaccine, date, time })}</p>
                        <p className="mt-2 text-sm text-green-600 dark:text-green-400">{t('vaccine_reminder')}</p>
                        <button onClick={resetForm} className="mt-6 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 dark:hover:bg-green-500 interactive-press">
                            {t('vaccine_schedule_another')}
                        </button>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="vaccine-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('vaccine_label')}</label>
                                <select id="vaccine-select" value={vaccine} onChange={(e) => handleVaccineChange(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white">
                                    <option value="">{t('vaccine_select')}</option>
                                    <option value="COVID-19 Booster">COVID-19 Booster</option>
                                    <option value="Influenza (Flu)">Influenza (Flu)</option>
                                    <option value="Tetanus, Diphtheria, Pertussis (Tdap)">Tetanus, Diphtheria, Pertussis (Tdap)</option>
                                    <option value="Human Papillomavirus (HPV)">Human Papillomavirus (HPV)</option>
                                </select>
                            </div>

                            {isLoadingInfo && (
                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">{t('vaccine_fetching_info')}</p>
                                </div>
                            )}

                            {vaccineInfo && !isLoadingInfo && (
                                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg animate-fade-in-up">
                                    <h4 className="font-bold text-blue-800 dark:text-blue-300">{t('vaccine_about')}</h4>
                                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: vaccineInfo.replace(/\*/g, '•').replace(/\n/g, '<br />') }} />
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="date-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('vaccine_date')}</label>
                                    <input id="date-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white" />
                                </div>
                                <div>
                                    <label htmlFor="time-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('vaccine_time')}</label>
                                    <input id="time-input" type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white" />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 interactive-press">
                                {t('vaccine_schedule_appointment')}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VaccinationPage;
