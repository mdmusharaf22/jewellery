import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlist, toggleWishlistAPI, clearWishlistAPI } from '@/lib/services/wishlistService';

export interface WishlistItem {
  id: number | string;
  product_id?: string;
  wishlist_item_id?: string; // For API delete operations
  name: string;
  price: number;
  karat: string;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
  synced: boolean; // Track if wishlist is synced with API
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
  synced: false,
};

// Load wishlist from localStorage (for guests) or sessionStorage (for logged-in users)
const loadWishlistFromStorage = (): WishlistState => {
  // Only access storage on client side
  if (typeof window === 'undefined') {
    return initialState;
  }
  
  try {
    // Try sessionStorage first (for logged-in users)
    const sessionWishlist = sessionStorage.getItem('wishlist');
    if (sessionWishlist) {
      const parsed = JSON.parse(sessionWishlist);
      return {
        items: Array.isArray(parsed.items) ? parsed.items : [],
        loading: false,
        error: null,
        synced: parsed.synced || false,
      };
    }
    
    // Fall back to localStorage (for guests)
    const localWishlist = localStorage.getItem('guest_wishlist');
    if (localWishlist) {
      const parsed = JSON.parse(localWishlist);
      return {
        items: Array.isArray(parsed.items) ? parsed.items : [],
        loading: false,
        error: null,
        synced: false,
      };
    }
  } catch (error) {
    console.error('Error loading wishlist from storage:', error);
  }
  return initialState;
};

// Save wishlist to appropriate storage
const saveWishlistToStorage = (state: WishlistState, isAuthenticated: boolean = false) => {
  if (typeof window !== 'undefined') {
    if (isAuthenticated) {
      // Save to sessionStorage for logged-in users
      sessionStorage.setItem('wishlist', JSON.stringify(state));
      // Clear guest wishlist from localStorage
      localStorage.removeItem('guest_wishlist');
    } else {
      // Save to localStorage for guests
      localStorage.setItem('guest_wishlist', JSON.stringify(state));
    }
  }
};

// Async thunks for API operations
export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async () => {
  const response = await getWishlist();
  return response.data;
});

export const toggleWishlistAsync = createAsyncThunk(
  'wishlist/toggleWishlistAsync',
  async (productId: string) => {
    // Toggle the item
    await toggleWishlistAPI(productId);
    // Fetch the updated wishlist
    const response = await getWishlist();
    return response.data;
  }
);

// Async thunk to sync guest wishlist with API after login
export const syncGuestWishlistWithAPI = createAsyncThunk(
  'wishlist/syncGuestWishlist',
  async (guestItems: WishlistItem[]) => {
    console.log('[Wishlist Sync] ========== STARTING WISHLIST SYNC ==========');
    console.log('[Wishlist Sync] Guest wishlist has', guestItems.length, 'items');
    console.log('[Wishlist Sync] Guest items:', JSON.stringify(guestItems.map(item => ({
      id: item.id,
      product_id: item.product_id,
      name: item.name
    })), null, 2));
    
    // If no guest items, just fetch and return the existing wishlist
    if (guestItems.length === 0) {
      console.log('[Wishlist Sync] No guest items to sync, fetching existing wishlist');
      const response = await getWishlist();
      return response.data;
    }
    
    // First, fetch existing wishlist from API to avoid duplicates
    let existingWishlist;
    try {
      const existingResponse = await getWishlist();
      existingWishlist = existingResponse.data;
      console.log('[Wishlist Sync] Existing API wishlist has', existingWishlist.length, 'items');
      console.log('[Wishlist Sync] Existing items:', JSON.stringify(existingWishlist.map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        name: item.product?.name || item.name
      })), null, 2));
    } catch (error) {
      console.log('[Wishlist Sync] No existing wishlist found, starting fresh');
      existingWishlist = [];
    }
    
    // Create a set of existing product IDs (normalized to strings) to avoid duplicates
    const existingProductIds = new Set(
      existingWishlist.map((item: any) => String(item.product_id || item.id))
    );
    
    console.log('[Wishlist Sync] Existing product IDs in API wishlist:', Array.from(existingProductIds));
    
    // Process each guest item
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const item of guestItems) {
      // Normalize product ID to string for comparison
      const productId = String(item.product_id || item.id);
      
      console.log('[Wishlist Sync] ------ Processing item:', item.name, '------');
      console.log('[Wishlist Sync] Product ID:', productId);
      
      if (existingProductIds.has(productId)) {
        console.log('[Wishlist Sync] ⚠️  Item already exists in API wishlist');
        console.log('[Wishlist Sync] ⏭️  SKIPPING to avoid duplicate');
        skippedCount++;
        continue;
      }
      
      console.log('[Wishlist Sync] ➕ Item NOT in API wishlist, adding...');
      
      try {
        const addResponse = await toggleWishlistAPI(productId);
        console.log('[Wishlist Sync] ✅ API response:', addResponse.success ? 'SUCCESS' : 'FAILED');
        console.log('[Wishlist Sync] ✅ Item added successfully:', item.name);
        addedCount++;
      } catch (error: any) {
        console.error('[Wishlist Sync] ❌ Failed to add item:', item.name);
        console.error('[Wishlist Sync] ❌ Error:', error.message || error);
      }
    }
    
    console.log('[Wishlist Sync] ========== SYNC SUMMARY ==========');
    console.log('[Wishlist Sync] ✅ Added:', addedCount, 'items');
    console.log('[Wishlist Sync] ⏭️  Skipped:', skippedCount, 'duplicates');
    
    // Fetch the final wishlist from API
    console.log('[Wishlist Sync] Fetching final wishlist state from API...');
    const finalResponse = await getWishlist();
    console.log('[Wishlist Sync] ✅ Final wishlist has', finalResponse.data.length, 'items');
    console.log('[Wishlist Sync] Final items:', JSON.stringify(finalResponse.data.map((item: any) => ({
      id: item.id,
      product_id: item.product_id,
      name: item.product?.name || item.name
    })), null, 2));
    console.log('[Wishlist Sync] ========== SYNC COMPLETE ==========');
    
    return finalResponse.data;
  }
);

export const clearWishlistAsync = createAsyncThunk('wishlist/clearWishlistAsync', async () => {
  const response = await clearWishlistAPI();
  return response.data;
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState, // Use plain initialState, not loadWishlistFromStorage()
  reducers: {
    // Hydrate wishlist from storage (call this on client mount)
    hydrateWishlist: (state) => {
      if (typeof window !== 'undefined') {
        const loaded = loadWishlistFromStorage();
        state.items = loaded.items;
        state.synced = loaded.synced;
      }
    },
    
    // Local wishlist operations (for guest users)
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      if (!state.items) {
        state.items = [];
      }
      
      // Normalize product ID to string
      const productId = String(action.payload.product_id || action.payload.id);
      const exists = state.items.find(item => String(item.product_id || item.id) === productId);
      
      console.log('[Wishlist Reducer] Adding to wishlist:', {
        productId,
        name: action.payload.name,
        exists: exists ? 'found' : 'not found',
        currentWishlistSize: state.items.length
      });
      
      if (!exists) {
        console.log('[Wishlist Reducer] Adding new item to wishlist');
        state.items.push({
          ...action.payload,
          product_id: productId,
          id: productId
        });
      } else {
        console.log('[Wishlist Reducer] Item already in wishlist, skipping');
      }
      
      console.log('[Wishlist Reducer] Wishlist updated. Total items:', state.items.length);
      saveWishlistToStorage(state, false); // Save to localStorage for guests
    },
    
    removeFromWishlist: (state, action: PayloadAction<number | string>) => {
      if (!state.items) {
        state.items = [];
      }
      
      const productId = String(action.payload);
      state.items = state.items.filter(item => String(item.product_id || item.id) !== productId);
      
      console.log('[Wishlist Reducer] Removed item. Total items:', state.items.length);
      saveWishlistToStorage(state, false); // Save to localStorage for guests
    },
    
    clearWishlist: (state) => {
      state.items = [];
      state.synced = false;
      // Clear both storages
      if (typeof window !== 'undefined') {
        localStorage.removeItem('guest_wishlist');
        sessionStorage.removeItem('wishlist');
      }
    },

    // Set wishlist from API response
    setWishlist: (state, action: PayloadAction<any[]>) => {
      // Transform API items to local format
      state.items = action.payload.map((item: any) => {
        const product = item.product || item;
        const primaryImage = product?.images?.find((img: any) => img.is_primary)?.url || 
                           product?.images?.[0]?.url || 
                           'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id || item.id,
          product_id: item.product_id || item.id,
          name: product?.name || 'Product',
          price: product?.cached_price || product?.dynamic_price || 0,
          karat: product?.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: primaryImage,
        };
      });
      state.synced = true;
      saveWishlistToStorage(state, true); // Save to sessionStorage for logged-in users
    },
  },
  extraReducers: (builder) => {
    // Fetch wishlist
    builder.addCase(fetchWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.loading = false;
      console.log('[Wishlist] ========== FETCH WISHLIST RESPONSE ==========');
      console.log('[Wishlist] Full payload:', JSON.stringify(action.payload, null, 2));
      
      // Check if payload has data
      if (!action.payload || !Array.isArray(action.payload)) {
        console.error('[Wishlist] Fetch response has invalid data');
        state.items = [];
        saveWishlistToStorage(state, true);
        return;
      }
      
      console.log('[Wishlist] API returned', action.payload.length, 'items');
      
      // Transform API items to local format
      state.items = action.payload.map((item: any) => {
        console.log('[Wishlist] Processing item:', {
          wishlist_item_id: item.wishlist_item_id,
          id: item.id,
          product_id: item.product_id,
          name: item.name
        });
        
        // API returns primary_image directly, not nested in images array
        const image = item.primary_image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        const transformed = {
          id: item.product_id || item.id,
          product_id: item.product_id || item.id,
          wishlist_item_id: item.wishlist_item_id || item.id, // Store wishlist_item_id for delete operations
          name: item.name || 'Product',
          price: item.cached_price || item.dynamic_price || 0,
          karat: item.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: image,
        };
        
        console.log('[Wishlist] Transformed to:', {
          id: transformed.id,
          wishlist_item_id: transformed.wishlist_item_id,
          name: transformed.name
        });
        
        return transformed;
      });
      state.synced = true;
      console.log('[Wishlist] Final state has', state.items.length, 'items');
      console.log('[Wishlist] ==========================================');
      saveWishlistToStorage(state, true);
    });
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch wishlist';
    });

    // Toggle wishlist
    builder.addCase(toggleWishlistAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(toggleWishlistAsync.fulfilled, (state, action) => {
      state.loading = false;
      
      // Check if payload has data (should be array from getWishlist)
      if (!action.payload || !Array.isArray(action.payload)) {
        console.error('[Wishlist] Toggle response has invalid data');
        return;
      }
      
      console.log('[Wishlist] Toggle successful, wishlist now has', action.payload.length, 'items');
      
      // Transform API items to local format
      state.items = action.payload.map((item: any) => {
        // API returns primary_image directly, not nested in images array
        const image = item.primary_image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id || item.id,
          product_id: item.product_id || item.id,
          wishlist_item_id: item.wishlist_item_id || item.id, // Store wishlist_item_id for delete operations
          name: item.name || 'Product',
          price: item.cached_price || item.dynamic_price || 0,
          karat: item.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: image,
        };
      });
      state.synced = true;
      saveWishlistToStorage(state, true);
    });
    builder.addCase(toggleWishlistAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to toggle wishlist';
    });

    // Clear wishlist
    builder.addCase(clearWishlistAsync.fulfilled, (state) => {
      state.items = [];
      state.synced = true;
      saveWishlistToStorage(state, true);
    });

    // Sync guest wishlist with API
    builder.addCase(syncGuestWishlistWithAPI.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(syncGuestWishlistWithAPI.fulfilled, (state, action) => {
      state.loading = false;
      
      // Create a map of guest items to preserve their images
      const guestItemsMap = new Map();
      state.items.forEach(item => {
        const productId = String(item.product_id || item.id);
        guestItemsMap.set(productId, {
          image: item.image,
          name: item.name,
          price: item.price,
          karat: item.karat
        });
      });
      
      // Transform API items to local format, preserving guest images where available
      state.items = action.payload.map((item: any) => {
        const product = item.product || item;
        const productId = String(item.product_id || item.id);
        
        // Check if this item was in the guest wishlist
        const guestItem = guestItemsMap.get(productId);
        
        // If item was in guest wishlist, use its image; otherwise extract from API
        const image = guestItem?.image || 
                     product?.images?.find((img: any) => img.is_primary)?.url || 
                     product?.images?.[0]?.url || 
                     'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: productId,
          product_id: productId,
          name: guestItem?.name || product?.name || 'Product',
          price: guestItem?.price || product?.cached_price || product?.dynamic_price || 0,
          karat: guestItem?.karat || (product?.metal_type === 'gold' ? '22KT Gold' : 'Silver'),
          image: image,
        };
      });
      state.synced = true;
      saveWishlistToStorage(state, true);
      // Clear guest wishlist from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('guest_wishlist');
      }
    });
    builder.addCase(syncGuestWishlistWithAPI.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to sync wishlist';
    });
  },
});

export const { hydrateWishlist, addToWishlist, removeFromWishlist, clearWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
