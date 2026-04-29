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

    return initialState;
  }

  const savedAuth = localStorage.getItem('auth');

  if (savedAuth) {
    try {
      const parsed = JSON.parse(savedAuth);

      return parsed;
    } catch (error) {

    }
  } else {

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

        const loaded = loadAuthFromStorage();

        state.user = loaded.user;
        state.isAuthenticated = loaded.isAuthenticated;

      }
    },
    
    login: (state, action: PayloadAction<User>) => {

      state.user = action.payload;
      state.isAuthenticated = true;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth', JSON.stringify(state));

      }
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
        localStorage.removeItem('customer_token');

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
