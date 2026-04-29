// Wishlist API service
import { api } from '../api';

export interface WishlistItem {
  id: string;
  product_id: string;
  product?: {
    id: string;
    name: string;
    slug: string;
    cached_price: number | null;
    dynamic_price: number;
    metal_type: string;
    images: {
      url: string;
      is_primary: boolean;
    }[];
  };
}

export interface WishlistResponse {
  success: boolean;
  message: string;
  data: WishlistItem[];
}

// Get wishlist items
export const getWishlist = async (): Promise<WishlistResponse> => {
  try {
    const response = await api.get('/wishlist', { requiresAuth: true });
    return response;
  } catch (error) {

    throw error;
  }
};

// Toggle item in wishlist (add or remove)
export const toggleWishlistAPI = async (productId: string): Promise<WishlistResponse> => {
  try {
    const response = await api.post('/wishlist/toggle', { product_id: productId }, { requiresAuth: true });
    return response;
  } catch (error) {

    throw error;
  }
};

// Clear entire wishlist
export const clearWishlistAPI = async (): Promise<WishlistResponse> => {
  try {
    const response = await api.delete('/wishlist', { requiresAuth: true });
    return response;
  } catch (error) {

    throw error;
  }
};
