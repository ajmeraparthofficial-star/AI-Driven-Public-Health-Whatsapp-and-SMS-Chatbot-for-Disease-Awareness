import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import StethoscopeIcon from './icons/StethoscopeIcon';
import { useLanguage } from '../context/LanguageContext';

const AuthPage: React.FC = () => {
    const auth = useContext(AuthContext);
    const { t } = useLanguage();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!auth) {
        return null; // or a loading indicator
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            if (isLogin) {
                await auth.login(email, password);
            } else {
                await auth.signup(name, email, password);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-blue-900/40 p-4">
            <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full">
                <StethoscopeIcon className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400 mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Medicos AI</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">{isLogin ? t('auth_welcome_back') : t('auth_create_account')}</p>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                         <div>
                            <input
                                type="text"
                                placeholder={t('auth_full_name')}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    )}
                    <div>
                        <input
                            type="email"
                            placeholder={t('auth_email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder={t('auth_password')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 interactive-press dark:hover:bg-blue-500"
                    >
                        {isLoading ? t('auth_processing') : (isLogin ? t('auth_login') : t('auth_signup'))}
                    </button>
                </form>
                <button
                    onClick={() => { setIsLogin(!isLogin); setError(''); }}
                    className="mt-6 text-sm text-blue-700 dark:text-blue-400 hover:underline interactive-press"
                >
                    {isLogin ? t('auth_toggle_signup') : t('auth_toggle_login')}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
