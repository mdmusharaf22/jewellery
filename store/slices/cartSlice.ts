import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, addToCartAPI, updateCartItem, removeFromCartAPI, clearCartAPI } from '@/lib/services/cartService';

export interface CartItem {
  id: number | string;
  product_id?: string;
  name: string;
  price: number;
  karat: string;
  image: string;
  quantity: number;
  selectedPurity?: string;
  selectedLength?: string;
  cart_item_id?: string; // For API operations
}

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
  synced: boolean; // Track if cart is synced with API
}

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  synced: false,
};

// Load cart from localStorage (for guests) or sessionStorage (for logged-in users)
const loadCartFromStorage = (): CartState => {
  if (typeof window !== 'undefined') {
    try {
      // Try sessionStorage first (for logged-in users)
      const sessionCart = sessionStorage.getItem('cart');
      if (sessionCart) {
        const parsed = JSON.parse(sessionCart);
        return {
          items: Array.isArray(parsed.items) ? parsed.items : [],
          total: typeof parsed.total === 'number' ? parsed.total : 0,
          loading: false,
          error: null,
          synced: parsed.synced || false,
        };
      }
      
      // Fall back to localStorage (for guests)
      const localCart = localStorage.getItem('guest_cart');
      if (localCart) {
        const parsed = JSON.parse(localCart);
        return {
          items: Array.isArray(parsed.items) ? parsed.items : [],
          total: typeof parsed.total === 'number' ? parsed.total : 0,
          loading: false,
          error: null,
          synced: false,
        };
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  }
  return initialState;
};

// Save cart to appropriate storage
const saveCartToStorage = (state: CartState, isAuthenticated: boolean = false) => {
  if (typeof window !== 'undefined') {
    if (isAuthenticated) {
      // Save to sessionStorage for logged-in users
      sessionStorage.setItem('cart', JSON.stringify(state));
      // Clear guest cart from localStorage
      localStorage.removeItem('guest_cart');
    } else {
      // Save to localStorage for guests
      localStorage.setItem('guest_cart', JSON.stringify(state));
    }
  }
};

// Async thunks for API operations
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await getCart();
  return response.data;
});

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async ({ productId, quantity, productData }: { productId: string; quantity: number; productData?: Partial<CartItem> }) => {
    const response = await addToCartAPI(productId, quantity);
    return { data: response.data, productData };
  }
);

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItemAsync',
  async ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) => {
    const response = await updateCartItem(cartItemId, quantity);
    return response.data;
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (cartItemId: string) => {
    const response = await removeFromCartAPI(cartItemId);
    return response.data;
  }
);

// Async thunk to sync guest cart with API after login
export const syncGuestCartWithAPI = createAsyncThunk(
  'cart/syncGuestCart',
  async (guestItems: CartItem[]) => {
    // Add each guest cart item to the API
    for (const item of guestItems) {
      try {
        await addToCartAPI(String(item.product_id || item.id), item.quantity);
      } catch (error) {
        console.error('Failed to sync item:', item.name, error);
      }
    }
    // Fetch the updated cart from API
    const response = await getCart();
    return response.data;
  }
);

export const clearCartAsync = createAsyncThunk('cart/clearCartAsync', async () => {
  const response = await clearCartAPI();
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    // Local cart operations (for guest users)
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      if (!state.items) {
        state.items = [];
      }
      
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ 
          ...action.payload, 
          quantity: action.payload.quantity || 1,
          product_id: String(action.payload.id) // Store product_id for API sync later
        });
      }
      
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      saveCartToStorage(state, false); // Save to localStorage for guests
    },
    
    removeFromCart: (state, action: PayloadAction<number | string>) => {
      if (!state.items) {
        state.items = [];
      }
      
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      saveCartToStorage(state, false); // Save to localStorage for guests
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: number | string; quantity: number }>) => {
      if (!state.items) {
        state.items = [];
      }
      
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      saveCartToStorage(state, false); // Save to localStorage for guests
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.synced = false;
      // Clear both storages
      if (typeof window !== 'undefined') {
        localStorage.removeItem('guest_cart');
        sessionStorage.removeItem('cart');
      }
    },

    // Set cart from API response
    setCart: (state, action: PayloadAction<{ items: any[]; subtotal: number }>) => {
      // Transform API items to local format
      state.items = action.payload.items.map((item: any) => {
        const product = item.product;
        const primaryImage = product?.images?.find((img: any) => img.is_primary)?.url || 
                           product?.images?.[0]?.url || 
                           'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.id,
          name: product?.name || 'Product',
          price: product?.cached_price || product?.dynamic_price || 0,
          karat: product?.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: primaryImage,
          quantity: item.quantity,
        };
      });
      state.total = action.payload.subtotal;
      state.synced = true;
      saveCartToStorage(state, true); // Save to sessionStorage for logged-in users
    },
  },
  extraReducers: (builder) => {
    // Fetch cart
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      // Transform API items to local format
      state.items = action.payload.items.map((item: any) => {
        const product = item.product;
        const primaryImage = product?.images?.find((img: any) => img.is_primary)?.url || 
                           product?.images?.[0]?.url || 
                           'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.id,
          name: product?.name || 'Product',
          price: product?.cached_price || product?.dynamic_price || 0,
          karat: product?.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: primaryImage,
          quantity: item.quantity,
        };
      });
      state.total = action.payload.subtotal;
      state.synced = true;
      saveCartToStorage(state);
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch cart';
    });

    // Add to cart
    builder.addCase(addToCartAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.loading = false;
      // Transform API items to local format
      state.items = action.payload.data.items.map((item: any) => {
        const product = item.product;
        const primaryImage = product?.images?.find((img: any) => img.is_primary)?.url || 
                           product?.images?.[0]?.url || 
                           'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.id,
          name: product?.name || 'Product',
          price: product?.cached_price || product?.dynamic_price || 0,
          karat: product?.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: primaryImage,
          quantity: item.quantity,
        };
      });
      state.total = action.payload.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      state.synced = true;
      saveCartToStorage(state, true); // Save to sessionStorage
    });
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to add to cart';
    });

    // Update cart item
    builder.addCase(updateCartItemAsync.fulfilled, (state, action) => {
      state.items = action.payload.items.map((item: any) => {
        const product = item.product;
        const primaryImage = product?.images?.find((img: any) => img.is_primary)?.url || 
                           product?.images?.[0]?.url || 
                           'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.id,
          name: product?.name || 'Product',
          price: product?.cached_price || product?.dynamic_price || 0,
          karat: product?.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: primaryImage,
          quantity: item.quantity,
        };
      });
      state.total = action.payload.subtotal;
      saveCartToStorage(state, true); // Save to sessionStorage
    });

    // Remove from cart
    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      state.items = action.payload.items.map((item: any) => {
        const product = item.product;
        const primaryImage = product?.images?.find((img: any) => img.is_primary)?.url || 
                           product?.images?.[0]?.url || 
                           'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.id,
          name: product?.name || 'Product',
          price: product?.cached_price || product?.dynamic_price || 0,
          karat: product?.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: primaryImage,
          quantity: item.quantity,
        };
      });
      state.total = action.payload.subtotal;
      saveCartToStorage(state, true); // Save to sessionStorage
    });

    // Clear cart
    builder.addCase(clearCartAsync.fulfilled, (state) => {
      state.items = [];
      state.total = 0;
      state.synced = true;
      saveCartToStorage(state, true); // Save to sessionStorage
    });

    // Sync guest cart with API
    builder.addCase(syncGuestCartWithAPI.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(syncGuestCartWithAPI.fulfilled, (state, action) => {
      state.loading = false;
      // Transform API items to local format
      state.items = action.payload.items.map((item: any) => {
        const product = item.product;
        const primaryImage = product?.images?.find((img: any) => img.is_primary)?.url || 
                           product?.images?.[0]?.url || 
                           'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.id,
          name: product?.name || 'Product',
          price: product?.cached_price || product?.dynamic_price || 0,
          karat: product?.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: primaryImage,
          quantity: item.quantity,
        };
      });
      state.total = action.payload.subtotal;
      state.synced = true;
      saveCartToStorage(state, true); // Save to sessionStorage
      // Clear guest cart from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('guest_cart');
      }
    });
    builder.addCase(syncGuestCartWithAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to sync cart';
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
