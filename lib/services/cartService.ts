// Cart API service
import { api } from '../api';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
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

export interface CartResponse {
  success: boolean;
  message: string;
  data: {
    items: CartItem[];
    subtotal: number;
  };
}

// Get cart items
export const getCart = async (): Promise<CartResponse> => {
  try {
    const response = await api.get('/cart', { requiresAuth: true });
    return response;
  } catch (error) {

    throw error;
  }
};

// Add item to cart
export const addToCartAPI = async (productId: string, quantity: number = 1): Promise<CartResponse> => {
  try {
    const response = await api.post('/cart', { product_id: productId, quantity }, { requiresAuth: true });
    return response;
  } catch (error) {

    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (cartItemId: string, quantity: number): Promise<CartResponse> => {
  try {
    const response = await api.put(`/cart/${cartItemId}`, { quantity }, { requiresAuth: true });
    return response;
  } catch (error) {

    throw error;
  }
};

// Remove item from cart
export const removeFromCartAPI = async (cartItemId: string): Promise<CartResponse> => {
  try {

    const response = await api.delete(`/cart/${cartItemId}`, { requiresAuth: true });

    return response;
  } catch (error) {

    throw error;
  }
};

// Clear entire cart
export const clearCartAPI = async (): Promise<CartResponse> => {
  try {
    const response = await api.delete('/cart', { requiresAuth: true });
    return response;
  } catch (error) {

    throw error;
  }
};
