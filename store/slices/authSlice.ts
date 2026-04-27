import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

// Load auth from localStorage
const loadAuthFromStorage = (): AuthState => {
  // Only access storage on client side
  if (typeof window === 'undefined') {
    console.log('[Auth Storage] Server side, returning initial state');
    return initialState;
  }
  
  console.log('[Auth Storage] Loading from localStorage...');
  const savedAuth = localStorage.getItem('auth');
  console.log('[Auth Storage] Raw auth data:', savedAuth);
  
  if (savedAuth) {
    try {
      const parsed = JSON.parse(savedAuth);
      console.log('[Auth Storage] Parsed auth data:', parsed);
      return parsed;
    } catch (error) {
      console.error('[Auth Storage] Error parsing auth from storage:', error);
    }
  } else {
    console.log('[Auth Storage] No auth data found in localStorage');
  }
  
  return initialState;
};

const authSlice = createSlice({
  name: 'auth',
  initialState, // Use plain initialState, not loadAuthFromStorage()
  reducers: {
    // Hydrate auth from storage (call this on client mount)
    hydrateAuth: (state) => {
      if (typeof window !== 'undefined') {
        console.log('[Auth Hydrate] Starting hydration...');
        const loaded = loadAuthFromStorage();
        console.log('[Auth Hydrate] Loaded from storage:', {
          hasUser: !!loaded.user,
          isAuthenticated: loaded.isAuthenticated,
          user: loaded.user
        });
        state.user = loaded.user;
        state.isAuthenticated = loaded.isAuthenticated;
        console.log('[Auth Hydrate] Hydration complete. isAuthenticated:', state.isAuthenticated);
      }
    },
    
    login: (state, action: PayloadAction<User>) => {
      console.log('[Auth] Login action called with user:', action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth', JSON.stringify(state));
        console.log('[Auth] Saved to localStorage. isAuthenticated:', state.isAuthenticated);
      }
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
        localStorage.removeItem('customer_token');
        console.log('[Auth] Logged out - cleared localStorage');
      }
    },
    
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth', JSON.stringify(state));
        }
      }
    },
  },
});

export const { hydrateAuth, login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
