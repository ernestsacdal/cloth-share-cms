'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as authApi from '@/lib/api/auth';
import type { User, SignUpData, LoginData } from '@/lib/api/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginData) => Promise<void>;
    signUp: (data: SignUpData) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const isAuthenticated = !!user;

    // Check if user is authenticated on mount
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setIsLoading(false);
                return;
            }

            // Fetch current user
            const currentUser = await authApi.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error('Auth check failed:', error);
            // Clear invalid tokens
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    // Login function
    // Login function
    const login = async (data: LoginData) => {
        try {
            const response = await authApi.login(data);

            // Store tokens
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);

            // Set user
            setUser(response.user as User);

            // Redirect to browse
            router.push('/browse');
        } catch (error: any) {

            // Extract API error message
            const apiMessage = error.response?.data?.message || error.message;
            throw new Error(apiMessage);
        }
    };

    // Sign up function
    const signUp = async (data: SignUpData) => {
        try {
            const response = await authApi.signUp(data);

            // Store tokens
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);

            // Set user
            setUser(response.user as User);

            // Redirect to browse
            router.push('/browse');
        } catch (error) {
            const apiMessage = error instanceof Error ? error.message : 'An error occurred';
            if (error && typeof error === 'object' && 'response' in error) {
                const err = error as { response?: { data?: { message?: string } } };
                throw new Error(err.response?.data?.message || apiMessage);
            }
            throw new Error(apiMessage);
        }
    };


    // Logout function
    // Logout function
    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear tokens and user
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setUser(null);

            // Redirect to landing page (changed from /login)
            router.push('/');
        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                signUp,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
