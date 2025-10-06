import { apiClient } from './client';

export interface Item {
  id: string;
  title: string;
  description: string;
  brand?: string;
  category: string;
  size: string;
  condition: string;
  color?: string;
  measurementChest?: string;
  measurementLength?: string;
  measurementSleeves?: string;
  images: string[];
  pickupLocation: string;
  pickupInstructions?: string;
  availability: string[];
  meetingPreference?: string;
  status: string;
  views: number;
  interestedCount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    displayName: string | null;
    avatar: string | null;
  };
}

export interface CreateItemData {
  title: string;
  brand?: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  color?: string;
  measurementChest?: string;
  measurementLength?: string;
  measurementSleeves?: string;
  images: string[];
  pickupLocation: string;
  pickupInstructions?: string;
  availability: string[];
  meetingPreference?: string;
}

export interface ItemFilters {
  category?: string;
  size?: string;
  condition?: string;
  search?: string;
  status?: string;
}

// Get all items with filters
export const getItems = async (filters?: ItemFilters): Promise<Item[]> => {
  const params = new URLSearchParams();
  
  if (filters?.category && filters.category !== 'all') {
    params.append('category', filters.category);
  }
  if (filters?.size && filters.size !== 'all') {
    params.append('size', filters.size);
  }
  if (filters?.condition) {
    params.append('condition', filters.condition);
  }
  if (filters?.search) {
    params.append('search', filters.search);
  }
  if (filters?.status) {
    params.append('status', filters.status);
  }

  const response = await apiClient.get(`/items?${params.toString()}`);
  return response.data.data;
};

// Get single item by ID
export const getItemById = async (id: string): Promise<Item> => {
  const response = await apiClient.get(`/items/${id}`);
  return response.data.data;
};

// Create new item
export const createItem = async (data: CreateItemData): Promise<Item> => {
  const response = await apiClient.post('/items', data);
  return response.data.data;
};

// Update item
export const updateItem = async (id: string, data: Partial<CreateItemData>): Promise<Item> => {
  const response = await apiClient.put(`/items/${id}`, data);
  return response.data.data;
};

// Delete item
export const deleteItem = async (id: string): Promise<void> => {
  await apiClient.delete(`/items/${id}`);
};

// Get current user's items
export const getMyItems = async (): Promise<Item[]> => {
  const response = await apiClient.get('/items/my/items');
  return response.data.data;
};
