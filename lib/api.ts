// API utility functions with authentication

import { getAccessToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
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

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: requestHeaders,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
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
