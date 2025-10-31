import { User } from '../types';

// --- MOCK DATABASE ---
// In a real application, this data would live in your Google Sheet.
// This service simulates making secure API calls to that sheet from a backend.
let users: User[] = [
    {
        id: 'user-1',
        name: 'yash',
        email: 'yash@gmail.com',
        password: 'password123',
    }
];

/**
 * IMPORTANT: This is a MOCK service.
 * In a real-world application, you would NEVER handle user data or API calls
 * directly in the frontend. This logic would be on a secure backend server (e.g., a Node.js function)
 * that communicates with the Google Sheets API. The frontend would only call your backend endpoints.
 * This simulation allows us to build the UI and logic as if a backend were present.
 */

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const verifyUser = async (email: string, password: string): Promise<User | null> => {
    await delay(500); // Simulate network latency
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
};

export const addUser = async (name: string, email: string, password: string): Promise<User> => {
    await delay(500);
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        throw new Error('An account with this email already exists.');
    }
    const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        password, // The password would be securely hashed on a real backend
    };
    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};

export const updateUser = async (updatedUser: User): Promise<User> => {
    await delay(300);
    const userIndex = users.findIndex(u => u.id === updatedUser.id);
    if (userIndex === -1) {
        throw new Error('User not found.');
    }
    // Retain the original password when updating
    const originalPassword = users[userIndex].password;
    users[userIndex] = { ...updatedUser, password: originalPassword };
    
    const { password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
};