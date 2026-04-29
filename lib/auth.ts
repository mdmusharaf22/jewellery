// Auth utility functions

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const adminToken = sessionStorage.getItem('admin_access_token');
  const customerToken = localStorage.getItem('customer_token');
  return !!(adminToken || customerToken);
};

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  // Check current path to determine which token to use
  const isAdminPath = window.location.pathname.startsWith('/admin');
  
  if (isAdminPath) {
    // For admin paths, only use admin token
    const adminToken = sessionStorage.getItem('admin_access_token');
    if (adminToken) {

    }
    return adminToken;
  } else {
    // For customer paths, only use customer token
    const customerToken = localStorage.getItem('customer_token');
    if (customerToken) {

    }
    return customerToken;
  }
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('admin_refresh_token');
};

export const getAdminUser = () => {
  if (typeof window === 'undefined') return null;
  const user = sessionStorage.getItem('admin_user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem('admin_access_token');
  sessionStorage.removeItem('admin_refresh_token');
  sessionStorage.removeItem('admin_user');
  localStorage.removeItem('customer_token');
  localStorage.removeItem('auth');
};

export const setAuthTokens = (accessToken: string, refreshToken: string, user: any) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('admin_access_token', accessToken);
  sessionStorage.setItem('admin_refresh_token', refreshToken);
  sessionStorage.setItem('admin_user', JSON.stringify(user));
};

// Refresh access token using refresh token
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {

      return false;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {

      return false;
    }

    const data = await response.json();
    
    if (data.success && data.data?.access_token) {

      // Update access token
      sessionStorage.setItem('admin_access_token', data.data.access_token);
      
      // Update refresh token if provided
      if (data.data.refresh_token) {
        sessionStorage.setItem('admin_refresh_token', data.data.refresh_token);
      }
      
      // Update user data if provided
      if (data.data.user) {
        sessionStorage.setItem('admin_user', JSON.stringify(data.data.user));
      }
      
      return true;
    }

    return false;
  } catch (error) {

    return false;
  }
};

// Check if token is valid and refresh if needed
export const ensureValidToken = async (): Promise<boolean> => {
  const accessToken = getAccessToken();
  
  if (!accessToken) {

    return false;
  }

  // Try to refresh the token
  const refreshed = await refreshAccessToken();
  
  if (refreshed) {

    return true;
  }

  return false;
};
