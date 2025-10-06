import { apiClient } from './client';

export interface Review {
  id: string;
  rating: number;
  comment: string;
  helpfulCount: number;
  reviewerId: string;
  reviewedUserId: string;
  itemId?: string;
  createdAt: string;
  updatedAt: string;
  reviewer: {
    id: string;
    displayName: string;
    avatar?: string;
  };
  reviewedUser?: {
    id: string;
    displayName: string;
  };
  item?: {
    id: string;
    title: string;
  };
}

export interface CreateReviewData {
  rating: number;
  comment: string;
  reviewedUserId: string;
  itemId?: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  page: number;
  totalPages: number;
}

// Create review
export const createReview = async (data: CreateReviewData): Promise<Review> => {
  const response = await apiClient.post('/reviews', data);
  return response.data.data;
};

// Get user reviews (paginated)
export const getUserReviews = async (
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<ReviewsResponse> => {
  const response = await apiClient.get(`/reviews/user/${userId}`, {
    params: { page, limit },
  });
  return response.data.data;
};

// Get review by ID
export const getReviewById = async (reviewId: string): Promise<Review> => {
  const response = await apiClient.get(`/reviews/${reviewId}`);
  return response.data.data;
};

// Update review
export const updateReview = async (
  reviewId: string,
  data: { rating: number; comment: string }
): Promise<Review> => {
  const response = await apiClient.put(`/reviews/${reviewId}`, data);
  return response.data.data;
};

// Delete review
export const deleteReview = async (reviewId: string): Promise<void> => {
  await apiClient.delete(`/reviews/${reviewId}`);
};
