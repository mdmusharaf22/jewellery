// API utility functions with authentication

import { getAccessToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Log API configuration on startup
if (typeof window !== 'undefined') {

  if (!API_BASE_URL) {

  }
}

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

// Helper function to handle 401 responses
export function handleUnauthorized() {
  if (typeof window !== 'undefined') {
    const adminToken = sessionStorage.getItem('admin_access_token');
    const customerToken = localStorage.getItem('customer_token');

    if (adminToken) {
      // Admin session expired

      sessionStorage.removeItem('admin_access_token');
      sessionStorage.removeItem('admin_refresh_token');
      sessionStorage.removeItem('admin_user');
      window.location.href = '/admin/login';
    } else if (customerToken) {
      // Customer session expired

      localStorage.removeItem('customer_token');
      localStorage.removeItem('auth');
      window.location.href = '/login';
    } else {
      // No token found, check current path
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin')) {

        window.location.href = '/admin/login';
      } else {

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

  if (restOptions.body) {

  }

  try {
    let response = await fetch(url, {
      ...restOptions,
      headers: requestHeaders,
    });

    // Log response status

    // Handle 401/403 Unauthorized - try refresh token
    if ((response.status === 401 || response.status === 403) && requiresAuth) {

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

        if (response.ok) {

        }
      }
      
      // If still unauthorized after refresh, redirect to login
      if ((response.status === 401 || response.status === 403) && requiresAuth) {

        handleUnauthorized();
        throw new Error('Session expired. Please login again.');
      }
    }

    const data = await response.json();

    // For 404 errors, return the error data instead of throwing
    // This allows graceful fallback handling
    if (response.status === 404) {

      return {
        success: false,
        message: data.message || 'Not found',
        status: 404,
        data: null
      };
    }

    if (!response.ok) {

      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    // Log all errors

    // Only log errors that aren't 404s
    if (error instanceof Error && !error.message.includes('Not found')) {

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
