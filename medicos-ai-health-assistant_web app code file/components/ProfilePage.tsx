import React, { useContext, useState, useEffect, useRef } from 'react';
import { Page, User } from '../types';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Language, useLanguage } from '../context/LanguageContext';
import { availableLanguages } from '../i18n/translations';
import { 
    ArrowRightOnRectangleIcon, PencilSquareIcon, XMarkIcon, CheckIcon, 
    CalendarDaysIcon, ClockIcon, HeartIcon, ScaleIcon, BeakerIcon, 
    PresentationChartLineIcon, CameraIcon, Cog6ToothIcon, LanguageIcon
} from '@heroicons/react/24/outline';

interface ProfilePageProps {
    setPage: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setPage }) => {
    const auth = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<User>>({});
    const [newAvatar, setNewAvatar] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const healthSchedule = [
        { id: '1', type: 'checkup', title: 'Annual Physical Checkup', date: '2024-08-15', time: '10:30 AM' },
        { id: '2', type: 'medication', title: 'Metformin 500mg', date: 'Daily', time: '08:00 AM' },
        { id: '3', type: 'medication', title: 'Vitamin D Supplement', date: 'Daily', time: '09:00 AM' },
        { id: '4', type: 'checkup', title: 'Dentist Appointment', date: '2024-09-02', time: '02:00 PM' },
        { id: '5', type: 'medication', title: 'Metformin 500mg', date: 'Daily', time: '08:00 PM' },
    ];

    const healthVitals = [
        { name: 'Heart Rate', value: '72 bpm', status: 'Normal', Icon: HeartIcon },
        { name: 'Blood Pressure', value: '120/80', status: 'Normal', Icon: PresentationChartLineIcon },
        { name: 'BMI', value: '22.5', status: 'Normal', Icon: ScaleIcon },
        { name: 'Blood Sugar', value: '135 mg/dL', status: 'Borderline', Icon: BeakerIcon },
    ];

    const getStatusColor = (status: string) => {
        const isDark = theme === 'dark';
        switch (status) {
            case 'Normal': return { 
                bg: isDark ? 'bg-green-900/50' : 'bg-green-100', 
                text: isDark ? 'text-green-300' : 'text-green-800', 
                dot: 'bg-green-500' 
            };
            case 'Borderline': return { 
                bg: isDark ? 'bg-yellow-900/50' : 'bg-yellow-100', 
                text: isDark ? 'text-yellow-300' : 'text-yellow-800', 
                dot: 'bg-yellow-500' 
            };
            case 'High': return { 
                bg: isDark ? 'bg-red-900/50' : 'bg-red-100', 
                text: isDark ? 'text-red-300' : 'text-red-800', 
                dot: 'bg-red-500' 
            };
            default: return { 
                bg: isDark ? 'bg-gray-700' : 'bg-gray-100', 
                text: isDark ? 'text-gray-300' : 'text-gray-800', 
                dot: 'bg-gray-500' 
            };
        }
    };

    useEffect(() => {
        if (auth?.user) {
            setFormData({
                name: auth.user.name,
                dob: auth.user.dob,
                bloodGroup: auth.user.bloodGroup,
            });
        }
    }, [auth?.user]);

    if (!auth || !auth.user) {
        return <div className="p-4 text-center">{t('loading')}</div>;
    }

    const { user, logout, updateUser } = auth;

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setNewAvatar(null);
        if (user) {
            setFormData({
                name: user.name,
                dob: user.dob,
                bloodGroup: user.bloodGroup,
            });
        }
    };

    const handleSave = async () => {
        if (updateUser) {
            const updatedData: User = { ...user, ...formData };
            if (newAvatar) {
                updatedData.avatarUrl = newAvatar;
            }
            await updateUser(updatedData);
        }
        setIsEditing(false);
        setNewAvatar(null);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-950 min-h-full pb-20">
            <header className="bg-blue-600 dark:bg-gray-800 p-4 shadow-md text-white sticky top-0 z-10">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">{t('profile_title')}</h1>
                    <div className="flex items-center space-x-2">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 interactive-press"><CheckIcon className="h-6 w-6" /></button>
                                <button onClick={handleCancelEdit} className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 interactive-press"><XMarkIcon className="h-6 w-6" /></button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 interactive-press"><PencilSquareIcon className="h-6 w-6" /></button>
                        )}
                    </div>
                </div>
            </header>

            <div className="p-4 md:p-6 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
                    <div className="relative">
                        {(newAvatar || user.avatarUrl) ? (
                            <img src={newAvatar || user.avatarUrl} alt={user.name} className="h-28 w-28 rounded-full border-4 border-blue-200 dark:border-blue-700 object-cover" />
                        ) : (
                            <div className="h-28 w-28 rounded-full border-4 border-blue-200 dark:border-blue-700" />
                        )}
                        {isEditing && (
                            <>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleAvatarChange} 
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white cursor-pointer transition-opacity duration-200 opacity-0 hover:opacity-100 interactive-press"
                                    aria-label="Change profile picture"
                                >
                                    <CameraIcon className="h-8 w-8" />
                                </button>
                            </>
                        )}
                    </div>

                    <div className="w-full text-center sm:text-left">
                        {isEditing ? (
                            <div className="space-y-2">
                                <input type="text" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} className="text-2xl font-bold text-gray-800 dark:text-white border-b-2 border-gray-300 dark:border-gray-600 bg-transparent w-full focus:outline-none focus:border-blue-500"/>
                                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                                <div className="flex justify-center sm:justify-start space-x-4 text-sm mt-2">
                                     <input type="date" value={formData.dob || ''} onChange={(e) => setFormData({...formData, dob: e.target.value})} className="border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-gray-300 focus:outline-none focus:border-blue-500"/>
                                     <input type="text" placeholder={t('profile_blood_group')} value={formData.bloodGroup || ''} onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} className="border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-gray-600 dark:text-gray-300 focus:outline-none focus:border-blue-500"/>
                                </div>
                            </div>
                        ) : (
                             <div>
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
                                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                                <div className="flex justify-center sm:justify-start space-x-4 text-sm mt-2 text-gray-600 dark:text-gray-400">
                                    <span>{t('profile_dob')}: {user.dob || t('profile_not_set')}</span>
                                    <span>|</span>
                                    <span>{t('profile_blood_group')}: <strong>{user.bloodGroup || t('profile_not_set')}</strong></span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('profile_health_schedule')}</h3>
                    <ul className="space-y-3">
                        {healthSchedule.map(item => (
                            <li key={item.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                <div className={`p-3 rounded-full ${item.type === 'checkup' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300'}`}>
                                    {item.type === 'checkup' ? <CalendarDaysIcon className="h-5 w-5" /> : <ClockIcon className="h-5 w-5" />}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-gray-700 dark:text-gray-200">{item.title}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                                </div>
                                <div className="text-sm font-medium text-gray-800 dark:text-gray-300">
                                    {item.time}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('profile_health_vitals')}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {healthVitals.map(vital => {
                            const colors = getStatusColor(vital.status);
                            return (
                                <div key={vital.name} className={`p-4 rounded-lg text-center ${colors.bg}`}>
                                    <vital.Icon className={`h-8 w-8 mx-auto mb-2 ${colors.text}`} />
                                    <p className={`font-semibold text-sm ${colors.text}`}>{vital.name}</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">{vital.value}</p>
                                    <div className="flex items-center justify-center mt-1">
                                        <span className={`h-2 w-2 rounded-full ${colors.dot} mr-1.5`}></span>
                                        <p className={`text-xs font-medium ${colors.text}`}>{vital.status}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('profile_settings')}</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Cog6ToothIcon className="h-6 w-6 text-gray-600 dark:text-gray-400"/>
                                <span className="font-medium text-gray-700 dark:text-gray-200">{t('profile_dark_mode')}</span>
                            </div>
                            <button onClick={toggleTheme} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}/>
                            </button>
                        </div>
                         <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <LanguageIcon className="h-6 w-6 text-gray-600 dark:text-gray-400"/>
                                <label htmlFor="language-select" className="font-medium text-gray-700 dark:text-gray-200">{t('language')}</label>
                            </div>
                            <select 
                                id="language-select"
                                value={language} 
                                onChange={(e) => setLanguage(e.target.value as Language)} 
                                className="text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1"
                            >
                                {availableLanguages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6">
                     <button onClick={logout} className="w-full flex items-center justify-center gap-2 p-3 bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 font-semibold rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 interactive-press">
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        <span>{t('profile_logout')}</span>
                    </button>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p className="italic">Made by Team MedicosAI , Doon University</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;