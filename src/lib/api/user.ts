import { apiClient } from './client';

export interface User {
  id: string;
  email: string;
  displayName: string;
  username?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  itemsSharedCount: number;
  itemsClaimedCount: number;
  averageRating: number;
  reviewCount: number;
  badges: string[];
  emailMessages?: boolean;
  emailInterest?: boolean;
  pushMessages?: boolean;
  pushInterest?: boolean;
  weeklyDigest?: boolean;
  profileVisibility?: string;
  showLocation?: boolean;
  showStats?: boolean;
  allowMessages?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  displayName?: string;
  username?: string;
  bio?: string;
  location?: string;
  phone?: string;
  avatar?: string;
  emailMessages?: boolean;
  emailInterest?: boolean;
  pushMessages?: boolean;
  pushInterest?: boolean;
  weeklyDigest?: boolean;
  profileVisibility?: string;
  showLocation?: boolean;
  showStats?: boolean;
  allowMessages?: boolean;
}

// Get current user profile
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get('/users/me');
  return response.data.data;
};

// Get user by ID
export const getUserById = async (userId: string): Promise<User> => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data.data;
};

// Update current user profile
export const updateProfile = async (data: UpdateProfileData): Promise<User> => {
  const response = await apiClient.put('/users/me', data);
  return response.data.data;
};

// Get user stats
export const getUserStats = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}/stats`);
  return response.data.data;
};
