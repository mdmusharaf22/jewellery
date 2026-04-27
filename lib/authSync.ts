// Authentication synchronization across browser tabs
export const setupAuthSync = (onAuthChange: (isAuthenticated: boolean) => void) => {
  if (typeof window === 'undefined') return;

  // Listen for storage changes from other tabs (only localStorage triggers this)
  const handleStorageChange = (e: StorageEvent) => {
    // Check if auth-related storage changed
    if (e.key === 'customer_token' || e.key === 'auth') {
      const token = localStorage.getItem('customer_token');
      const authData = localStorage.getItem('auth');
      const isAuthenticated = !!(token && authData);
      
      console.log('[Auth Sync] Storage changed in another tab:', {
        key: e.key,
        isAuthenticated
      });
      
      onAuthChange(isAuthenticated);
    }
  };

  window.addEventListener('storage', handleStorageChange);

  // Return cleanup function
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};

// Check if user is authenticated (works across tabs)
export const checkAuth = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('customer_token');
  const authData = localStorage.getItem('auth');
  
  return !!(token && authData);
};

// Get user data from local storage
export const getUserFromSession = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsed = JSON.parse(authData);
      return parsed.user;
    }
  } catch (e) {
    console.error('Error parsing auth data:', e);
  }
  
  return null;
};
