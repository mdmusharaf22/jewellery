// API utility functions with authentication

import { getAccessToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Log API configuration on startup
if (typeof window !== 'undefined') {
  console.log('[API Config] Base URL:', API_BASE_URL || 'NOT SET');
  if (!API_BASE_URL) {
    console.error('[API Config] ERROR: NEXT_PUBLIC_API_BASE_URL is not set!');
  }
}

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

// Helper function to handle 401 responses
export function handleUnauthorized() {
  if (typeof window !== 'undefined') {
    const adminToken = sessionStorage.getItem('admin_access_token');
    const customerToken = sessionStorage.getItem('customer_token');
    
    console.log('[Auth] 401 Unauthorized - Checking tokens:', { 
      hasAdminToken: !!adminToken, 
      hasCustomerToken: !!customerToken 
    });
    
    if (adminToken) {
      // Admin session expired
      console.log('[Auth] Admin session expired, redirecting to /admin/login');
      sessionStorage.removeItem('admin_access_token');
      sessionStorage.removeItem('admin_refresh_token');
      sessionStorage.removeItem('admin_user');
      window.location.href = '/admin/login';
    } else if (customerToken) {
      // Customer session expired
      console.log('[Auth] Customer session expired, redirecting to /login');
      sessionStorage.removeItem('customer_token');
      sessionStorage.removeItem('auth');
      window.location.href = '/login';
    } else {
      // No token found, check current path
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin')) {
        console.log('[Auth] No token on admin path, redirecting to /admin/login');
        window.location.href = '/admin/login';
      } else {
        console.log('[Auth] No token on customer path, redirecting to /login');
        window.location.href = '/login';
      }
    }
  }
}

export async function apiRequest(
  endpoint: string,
  options: RequestOptions = {}
) {
  const { requiresAuth = true, headers = {}, ...restOptions } = options;

  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Add authorization header if required
  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${endpoint}`;

  // Log the request
  console.log(`[API Request] ${restOptions.method || 'GET'} ${url}`);
  if (restOptions.body) {
    console.log('[API Request Body]', restOptions.body);
  }

  try {
    let response = await fetch(url, {
      ...restOptions,
      headers: requestHeaders,
    });

    // Log response status
    console.log(`[API Response] ${response.status} ${response.statusText} - ${url}`);

    // Handle 401/403 Unauthorized - try refresh token
    if ((response.status === 401 || response.status === 403) && requiresAuth) {
      console.log('[API] Token expired or unauthorized, attempting refresh...');
      
      const { refreshAccessToken } = await import('./auth');
      const refreshed = await refreshAccessToken();
      
      if (refreshed) {
        // Retry with new token
        const newToken = getAccessToken();
        if (newToken) {
          requestHeaders['Authorization'] = `Bearer ${newToken}`;
        }
        
        response = await fetch(url, {
          ...restOptions,
          headers: requestHeaders,
        });
        
        console.log(`[API Retry] ${response.status} ${response.statusText} - ${url}`);
        
        if (response.ok) {
          console.log('[API] Request successful after token refresh');
        }
      }
      
      // If still unauthorized after refresh, redirect to login
      if ((response.status === 401 || response.status === 403) && requiresAuth) {
        console.error('[API Error] Authentication failed after refresh - redirecting to login');
        handleUnauthorized();
        throw new Error('Session expired. Please login again.');
      }
    }

    const data = await response.json();

    // For 404 errors, return the error data instead of throwing
    // This allows graceful fallback handling
    if (response.status === 404) {
      console.warn('[API Warning] 404 Not Found:', data.message);
      return {
        success: false,
        message: data.message || 'Not found',
        status: 404,
        data: null
      };
    }

    if (!response.ok) {
      console.error('[API Error]', response.status, data);
      throw new Error(data.message || 'API request failed');
    }

    console.log('[API Success]', data);
    return data;
  } catch (error) {
    // Log all errors
    console.error('[API Exception]', error);
    // Only log errors that aren't 404s
    if (error instanceof Error && !error.message.includes('Not found')) {
      console.error('API Error:', error);
    }
    throw error;
  }
}

// Convenience methods
export const api = {
  get: (endpoint: string, options?: RequestOptions) =>
    apiRequest(endpoint, { ...options, method: 'GET' }),

  post: (endpoint: string, body?: any, options?: RequestOptions) =>
    apiRequest(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: (endpoint: string, body?: any, options?: RequestOptions) =>
    apiRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  delete: (endpoint: string, options?: RequestOptions) =>
    apiRequest(endpoint, { ...options, method: 'DELETE' }),
};
