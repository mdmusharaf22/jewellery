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
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Add item to cart
export const addToCartAPI = async (productId: string, quantity: number = 1): Promise<CartResponse> => {
  try {
    const response = await api.post('/cart', { product_id: productId, quantity }, { requiresAuth: true });
    return response;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (cartItemId: string, quantity: number): Promise<CartResponse> => {
  try {
    const response = await api.put(`/cart/${cartItemId}`, { quantity }, { requiresAuth: true });
    return response;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCartAPI = async (cartItemId: string): Promise<CartResponse> => {
  try {
    console.log('[Cart Service] removeFromCartAPI called with cart_item_id:', cartItemId);
    const response = await api.delete(`/cart/${cartItemId}`, { requiresAuth: true });
    console.log('[Cart Service] removeFromCartAPI response:', response);
    return response;
  } catch (error) {
    console.error('[Cart Service] Error removing from cart:', error);
    throw error;
  }
};

// Clear entire cart
export const clearCartAPI = async (): Promise<CartResponse> => {
  try {
    const response = await api.delete('/cart', { requiresAuth: true });
    return response;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};
