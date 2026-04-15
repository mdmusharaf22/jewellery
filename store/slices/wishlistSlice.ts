import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  karat: string;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

// Load wishlist from localStorage
const loadWishlistFromStorage = (): WishlistState => {
  if (typeof window !== 'undefined') {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        // Ensure the parsed data has the correct structure
        return {
          items: Array.isArray(parsed.items) ? parsed.items : [],
        };
      }
    } catch (error) {
      console.error('Error loading wishlist from storage:', error);
    }
  }
  return initialState;
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: loadWishlistFromStorage(),
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      // Ensure items array exists
      if (!state.items) {
        state.items = [];
      }
      
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('wishlist', JSON.stringify(state));
        }
      }
    },
    
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      if (!state.items) {
        state.items = [];
      }
      
      state.items = state.items.filter(item => item.id !== action.payload);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(state));
      }
    },
    
    clearWishlist: (state) => {
      state.items = [];
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('wishlist');
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
