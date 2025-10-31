// FIX: Create content for missing AuthContext.ts file.

import { createContext } from 'react';
import { User } from '../types';

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (name: string, email: string, password: string) => Promise<void>;
    updateUser: (user: User) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
