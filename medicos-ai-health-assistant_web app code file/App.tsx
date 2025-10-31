import React, { useState, useMemo } from 'react';
import { Page, User } from './types';
import { AuthContext, AuthContextType } from './context/AuthContext';
import { verifyUser, addUser, updateUser as updateUserService } from './services/googleSheetService';
import Layout from './components/Layout';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import MedicalReportsPage from './components/MedicalReportsPage';
import HealthCheckupPage from './components/HealthCheckupPage';
import VaccinationPage from './components/VaccinationPage';
import DiseaseTrackerPage from './components/DiseaseTrackerPage';
import HealthCentersPage from './components/HealthCentersPage';

function App() {
    const [page, setPage] = useState<Page>(Page.PROFILE);
    const [user, setUser] = useState<User | null>(null);

    const authContextValue: AuthContextType = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        login: async (email, password) => {
            const loggedInUser = await verifyUser(email, password);
            if (loggedInUser) {
                setUser(loggedInUser);
                setPage(Page.PROFILE);
            } else {
                throw new Error('Invalid email or password.');
            }
        },
        signup: async (name, email, password) => {
            const newUser = await addUser(name, email, password);
            setUser(newUser);
            setPage(Page.PROFILE);
        },
        logout: () => {
            setUser(null);
        },
        updateUser: async (updatedUser: User) => {
            const savedUser = await updateUserService(updatedUser);
            setUser(savedUser);
        }
    }), [user]);

    const renderPage = () => {
        switch (page) {
            case Page.REPORTS:
                return <MedicalReportsPage setPage={setPage} />;
            case Page.HEALTH_CHECKUP:
                return <HealthCheckupPage setPage={setPage} />;
            case Page.VACCINATION:
                return <VaccinationPage setPage={setPage} />;
            case Page.TRACKER:
                return <DiseaseTrackerPage setPage={setPage} />;
            case Page.HEALTH_CENTERS:
                return <HealthCentersPage setPage={setPage} />;
            case Page.PROFILE:
            default:
                return <ProfilePage setPage={setPage} />;
        }
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {authContextValue.isAuthenticated ? (
                <Layout activePage={page} setPage={setPage}>
                    {renderPage()}
                </Layout>
            ) : (
                <AuthPage />
            )}
        </AuthContext.Provider>
    );
}

export default App;