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
  slug?: string; // Product slug for order creation
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
  // Only access storage on client side
  if (typeof window === 'undefined') {
    console.log('[Cart Storage] Server side, returning initial state');
    return initialState;
  }
  
  try {
    // Try sessionStorage first (for logged-in users)
    const sessionCart = sessionStorage.getItem('cart');
    if (sessionCart) {
      console.log('[Cart Storage] Found cart in sessionStorage');
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
      console.log('[Cart Storage] Found guest_cart in localStorage');
      const parsed = JSON.parse(localCart);
      const cartState = {
        items: Array.isArray(parsed.items) ? parsed.items : [],
        total: typeof parsed.total === 'number' ? parsed.total : 0,
        loading: false,
        error: null,
        synced: false,
      };
      console.log('[Cart Storage] Loaded guest cart:', {
        itemCount: cartState.items.length,
        total: cartState.total,
        items: cartState.items.map(item => ({ id: item.id, name: item.name, quantity: item.quantity }))
      });
      return cartState;
    }
    
    console.log('[Cart Storage] No cart found in storage');
  } catch (error) {
    console.error('[Cart Storage] Error loading cart from storage:', error);
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
  async ({ productId, quantity }: { productId: string; quantity: number }) => {
    // Add/update the item
    await addToCartAPI(productId, quantity);
    // Fetch the updated cart
    const response = await getCart();
    return response.data;
  }
);

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItemAsync',
  async ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) => {
    // Update the item
    await updateCartItem(cartItemId, quantity);
    // Fetch the updated cart
    const response = await getCart();
    return response.data;
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (cartItemId: string) => {
    console.log('[Cart Thunk] removeFromCartAsync called with cart_item_id:', cartItemId);
    // Remove the item
    await removeFromCartAPI(cartItemId);
    console.log('[Cart Thunk] Item removed, fetching updated cart...');
    // Fetch the updated cart
    const response = await getCart();
    console.log('[Cart Thunk] Updated cart fetched:', response.data);
    return response.data;
  }
);

// Async thunk to sync guest cart with API after login
export const syncGuestCartWithAPI = createAsyncThunk(
  'cart/syncGuestCart',
  async (guestItems: CartItem[]) => {
    console.log('[Cart Sync] ========== STARTING CART SYNC ==========');
    console.log('[Cart Sync] Guest cart has', guestItems.length, 'items');
    console.log('[Cart Sync] Guest items:', JSON.stringify(guestItems.map(item => ({
      id: item.id,
      product_id: item.product_id,
      name: item.name,
      quantity: item.quantity
    })), null, 2));
    
    // If no guest items, just fetch and return the existing cart
    if (guestItems.length === 0) {
      console.log('[Cart Sync] No guest items to sync, fetching existing cart');
      const response = await getCart();
      return response.data;
    }
    
    // First, fetch existing cart from API to avoid duplicates
    let existingCart;
    try {
      const existingResponse = await getCart();
      existingCart = existingResponse.data;
      console.log('[Cart Sync] Existing API cart has', existingCart.items.length, 'items');
      console.log('[Cart Sync] Existing items:', JSON.stringify(existingCart.items.map((item: any) => ({
        cart_item_id: item.id,
        product_id: item.product_id,
        name: item.product?.name,
        quantity: item.quantity
      })), null, 2));
    } catch (error) {
      console.log('[Cart Sync] No existing cart found, starting fresh');
      existingCart = { items: [] };
    }
    
    // Create a map of existing product IDs to their cart item details
    const existingProductMap = new Map();
    existingCart.items.forEach((item: any) => {
      const productId = String(item.product_id);
      existingProductMap.set(productId, {
        cart_item_id: item.cart_item_id || item.id,
        quantity: item.quantity,
        name: item.name || item.product?.name
      });
    });
    
    console.log('[Cart Sync] Existing product IDs in API cart:', Array.from(existingProductMap.keys()));
    
    // Process each guest item
    let addedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;
    
    for (const item of guestItems) {
      // Normalize product ID to string for comparison
      const productId = String(item.product_id || item.id);
      
      console.log('[Cart Sync] ------ Processing item:', item.name, '------');
      console.log('[Cart Sync] Product ID:', productId);
      console.log('[Cart Sync] Guest quantity:', item.quantity);
      
      if (existingProductMap.has(productId)) {
        const existingItem = existingProductMap.get(productId);
        console.log('[Cart Sync] ⚠️  Item already exists in API cart');
        console.log('[Cart Sync] Existing quantity:', existingItem.quantity);
        console.log('[Cart Sync] ⏭️  SKIPPING to avoid duplicate');
        skippedCount++;
        continue;
      }
      
      console.log('[Cart Sync] ➕ Item NOT in API cart, adding...');
      
      try {
        const addResponse = await addToCartAPI(productId, item.quantity);
        console.log('[Cart Sync] ✅ API response:', addResponse.success ? 'SUCCESS' : 'FAILED');
        console.log('[Cart Sync] ✅ Item added successfully:', item.name);
        addedCount++;
      } catch (error: any) {
        console.error('[Cart Sync] ❌ Failed to add item:', item.name);
        console.error('[Cart Sync] ❌ Error:', error.message || error);
      }
    }
    
    console.log('[Cart Sync] ========== SYNC SUMMARY ==========');
    console.log('[Cart Sync] ✅ Added:', addedCount, 'items');
    console.log('[Cart Sync] 🔄 Updated:', updatedCount, 'items');
    console.log('[Cart Sync] ⏭️  Skipped:', skippedCount, 'duplicates');
    
    // Fetch the final cart from API
    console.log('[Cart Sync] Fetching final cart state from API...');
    const finalResponse = await getCart();
    console.log('[Cart Sync] ✅ Final cart has', finalResponse.data.items.length, 'items');
    console.log('[Cart Sync] Final items:', JSON.stringify(finalResponse.data.items.map((item: any) => ({
      cart_item_id: item.id,
      product_id: item.product_id,
      name: item.product?.name,
      quantity: item.quantity
    })), null, 2));
    console.log('[Cart Sync] ========== SYNC COMPLETE ==========');
    
    // Return both the API response and the guest items so we can preserve images
    return {
      apiData: finalResponse.data,
      guestItems: guestItems
    };
  }
);

export const clearCartAsync = createAsyncThunk('cart/clearCartAsync', async () => {
  const response = await clearCartAPI();
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState, // Use plain initialState, not loadCartFromStorage()
  reducers: {
    // Hydrate cart from storage (call this on client mount)
    hydrateCart: (state) => {
      if (typeof window !== 'undefined') {
        console.log('[Cart Hydrate] Starting hydration...');
        const loaded = loadCartFromStorage();
        console.log('[Cart Hydrate] Loaded from storage:', {
          itemCount: loaded.items.length,
          total: loaded.total,
          synced: loaded.synced,
          items: loaded.items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        });
        state.items = loaded.items;
        state.total = loaded.total;
        state.synced = loaded.synced;
        console.log('[Cart Hydrate] Hydration complete. State now has', state.items.length, 'items');
        console.log('[Cart Hydrate] Total quantity:', state.items.reduce((sum, item) => sum + item.quantity, 0));
      }
    },
    
    // Local cart operations (for guest users)
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      if (!state.items) {
        state.items = [];
      }
      
      // Normalize product ID to string
      const productId = String(action.payload.product_id || action.payload.id);
      const existingItem = state.items.find(item => String(item.product_id || item.id) === productId);
      
      console.log('[Cart Reducer] Adding to cart:', {
        productId,
        name: action.payload.name,
        existingItem: existingItem ? 'found' : 'not found',
        currentCartSize: state.items.length
      });
      
      if (existingItem) {
        console.log('[Cart Reducer] Updating existing item quantity:', existingItem.quantity, '->', existingItem.quantity + (action.payload.quantity || 1));
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        console.log('[Cart Reducer] Adding new item to cart');
        state.items.push({ 
          ...action.payload, 
          quantity: action.payload.quantity || 1,
          product_id: productId,
          id: productId
        });
      }
      
      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      console.log('[Cart Reducer] Cart updated. Total items:', state.items.length, 'Total price:', state.total);
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
      // Transform API items to local format - API returns primary_image directly
      state.items = action.payload.items.map((item: any) => {
        // API returns primary_image directly, not nested in images array
        const image = item.primary_image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.id,
          name: item.name || 'Product',
          price: item.cached_price || item.dynamic_price || 0,
          karat: item.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: image,
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
      console.log('[Cart] ========== FETCH CART RESPONSE ==========');
      console.log('[Cart] Full payload:', JSON.stringify(action.payload, null, 2));
      
      // Check if payload exists and has items
      if (!action.payload || !action.payload.items) {
        console.error('[Cart] Fetch cart response has no items');
        state.items = [];
        state.total = 0;
        saveCartToStorage(state, true);
        return;
      }
      
      console.log('[Cart] API returned', action.payload.items.length, 'items');
      
      // Transform API items to local format - API returns primary_image directly
      state.items = action.payload.items.map((item: any) => {
        console.log('[Cart] Processing item from API:', {
          cart_item_id: item.cart_item_id,
          product_id: item.product_id,
          name: item.name,
          quantity: item.quantity,
          slug: item.slug
        });
        
        // API returns primary_image directly, not nested in images array
        const image = item.primary_image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        const transformed = {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.cart_item_id, // Use cart_item_id from API
          name: item.name || 'Product',
          price: item.cached_price || item.dynamic_price || 0,
          karat: item.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: image,
          quantity: item.quantity,
          slug: item.slug, // Include slug from API
        };
        
        console.log('[Cart] Transformed to:', {
          id: transformed.id,
          cart_item_id: transformed.cart_item_id,
          name: transformed.name,
          slug: transformed.slug
        });
        
        return transformed;
      });
      state.total = action.payload.subtotal || 0;
      state.synced = true;
      console.log('[Cart] Final state has', state.items.length, 'items');
      console.log('[Cart] Items with cart_item_id:', state.items.map(i => ({ 
        name: i.name, 
        cart_item_id: i.cart_item_id 
      })));
      console.log('[Cart] ==========================================');
      saveCartToStorage(state, true);
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
      
      // Check if payload exists and has items (payload is { items, subtotal } from getCart)
      if (!action.payload || !action.payload.items) {
        console.error('[Cart] Add to cart response has invalid structure:', action.payload);
        state.error = 'Invalid response from server';
        return;
      }
      
      console.log('[Cart] Add to cart successful, cart now has', action.payload.items.length, 'items');
      
      // Transform API items to local format - API returns primary_image directly
      state.items = action.payload.items.map((item: any) => {
        // API returns primary_image directly, not nested in images array
        const image = item.primary_image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.cart_item_id, // Use cart_item_id from API
          name: item.name || 'Product',
          price: item.cached_price || item.dynamic_price || 0,
          karat: item.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: image,
          quantity: item.quantity,
        };
      });
      state.total = action.payload.subtotal || 0;
      state.synced = true;
      saveCartToStorage(state, true);
    });
    builder.addCase(addToCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to add to cart';
    });

    // Update cart item
    builder.addCase(updateCartItemAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCartItemAsync.fulfilled, (state, action) => {
      state.loading = false;
      
      // Check if payload exists and has items (payload is { items, subtotal } from getCart)
      if (!action.payload || !action.payload.items) {
        console.error('[Cart] Update cart item response has no items');
        return;
      }
      
      // Transform API items to local format - API returns primary_image directly
      state.items = action.payload.items.map((item: any) => {
        // API returns primary_image directly, not nested in images array
        const image = item.primary_image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.cart_item_id, // Use cart_item_id from API
          name: item.name || 'Product',
          price: item.cached_price || item.dynamic_price || 0,
          karat: item.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: image,
          quantity: item.quantity,
        };
      });
      state.total = action.payload.subtotal || 0;
      saveCartToStorage(state, true);
    });
    builder.addCase(updateCartItemAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update cart item';
    });

    // Remove from cart
    builder.addCase(removeFromCartAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      state.loading = false;
      
      // Check if payload exists and has items (payload is { items, subtotal } from getCart)
      if (!action.payload || !action.payload.items) {
        console.error('[Cart] Remove cart item response has no items');
        state.items = [];
        state.total = 0;
        saveCartToStorage(state, true);
        return;
      }
      
      // Transform API items to local format - API returns primary_image directly
      state.items = action.payload.items.map((item: any) => {
        // API returns primary_image directly, not nested in images array
        const image = item.primary_image || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.cart_item_id, // Use cart_item_id from API
          name: item.name || 'Product',
          price: item.cached_price || item.dynamic_price || 0,
          karat: item.metal_type === 'gold' ? '22KT Gold' : 'Silver',
          image: image,
          quantity: item.quantity,
        };
      });
      state.total = action.payload.subtotal || 0;
      saveCartToStorage(state, true);
    });
    builder.addCase(removeFromCartAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to remove item from cart';
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
      
      // Extract guest items and API data from payload
      const { apiData, guestItems } = action.payload;
      
      // Create a map of guest items to preserve their images and other data
      const guestItemsMap = new Map();
      guestItems.forEach((item: CartItem) => {
        const productId = String(item.product_id || item.id);
        guestItemsMap.set(productId, {
          image: item.image,
          name: item.name,
          price: item.price,
          karat: item.karat
        });
      });
      
      console.log('[Cart Sync] Guest items map created with', guestItemsMap.size, 'items');
      console.log('[Cart Sync] Guest items for preservation:', Array.from(guestItemsMap.entries()).map(([id, data]) => ({
        id,
        name: data.name,
        hasImage: !!data.image
      })));
      
      // Transform API items to local format, preserving guest images where available
      state.items = apiData.items.map((item: any) => {
        const product = item.product || item;
        const productId = String(item.product_id);
        
        // Check if this item was in the guest cart
        const guestItem = guestItemsMap.get(productId);
        
        if (guestItem) {
          console.log('[Cart Sync] ✅ Preserving guest data for:', guestItem.name, 'with image:', guestItem.image?.substring(0, 50) + '...');
        } else {
          console.log('[Cart Sync] ⚠️  No guest data found for product:', productId, '- using API data');
        }
        
        // If item was in guest cart, use its image; otherwise extract from API
        const image = guestItem?.image || 
                     product?.images?.find((img: any) => img.is_primary)?.url || 
                     product?.images?.[0]?.url || 
                     'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600';
        
        return {
          id: item.product_id,
          product_id: item.product_id,
          cart_item_id: item.cart_item_id || item.id,
          name: guestItem?.name || product?.name || 'Product',
          price: guestItem?.price || product?.cached_price || product?.dynamic_price || 0,
          karat: guestItem?.karat || (product?.metal_type === 'gold' ? '22KT Gold' : 'Silver'),
          image: image,
          quantity: item.quantity,
        };
      });
      state.total = apiData.subtotal;
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

export const { hydrateCart, addToCart, removeFromCart, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
