import { apiClient } from './client';

export interface SignUpData {
  email: string;
  password: string;
  displayName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    displayName: string | null;
  };
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string | null;
  username: string | null;
  avatar: string | null;
  bio: string | null;
  location: string | null;
  phone: string | null;
  itemsSharedCount: number;
  itemsClaimedCount: number;
  averageRating: number | null;
  reviewCount: number;
  badges: string[];
  profileVisibility: string;
  createdAt: string;
  updatedAt: string;
}

// Sign up
export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/signup', data);
  return response.data.data;
};

// Login
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', data);
  return response.data.data;
};

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get('/auth/me');
  return response.data.data;
};

// Logout
export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

// Refresh token
export const refreshAccessToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
  const response = await apiClient.post('/auth/refresh', { refreshToken });
  return response.data.data;
};
