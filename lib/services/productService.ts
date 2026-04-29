// Product Service - API calls for product CRUD operations

import { getAccessToken } from '../auth';
import { handleUnauthorized, apiRequest } from '../api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  short_description?: string;
  category_id?: string;
  category_name?: string;
  base_weight?: number;
  is_customizable?: boolean;
  length_metric?: string;
  seo_title?: string;
  seo_description?: string;
  is_featured?: boolean;
  cached_price?: number;
  metal_type?: string;
  making_charges?: number;
  gemstone_value?: number;
  wastage?: number;
  gst?: number;
  dynamic_price?: number;
  price_breakup?: {
    gold_value?: number;
    silver_value?: number;
    making_charges?: number;
    gemstone_value?: number;
    wastage?: number;
    gst?: number;
    total?: number;
  };
  images?: Array<{ url: string; alt?: string }>;
  videos?: string[];
  length?: number[];
  features?: string[];
  information?: Array<{ key: string; value: string }>;
  dimensions?: Array<{ key: string; value: string }>;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductPayload {
  name: string;
  base_weight?: number;
  is_featured?: boolean;
  is_customizable?: boolean;
}

export interface UpdateProductPayload {
  name?: string;
  base_weight?: number;
}

// Get a single product by slug
export const getProduct = async (slug: string): Promise<Product> => {
  try {
    const token = getAccessToken();
    const response = await fetch(`${API_BASE_URL}/products/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Session expired. Please login again.');
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch product');
    return data.data;
  } catch (error) {

    throw error;
  }
};

// Get featured products with enhanced auth handling
export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    // Use the enhanced API request function that handles refresh tokens
    const data = await apiRequest('/products/featured', { requiresAuth: true });
    return data.data || [];
  } catch (error) {

    // If authenticated request fails, try public products endpoint as fallback
    try {

      const publicData = await apiRequest('/products', { requiresAuth: false });
      
      if (publicData.success && publicData.data) {
        // Filter for featured products
        const featuredProducts = publicData.data.filter((product: Product) => product.is_featured === true);

        return featuredProducts;
      }
    } catch (fallbackError) {

    }
    
    throw error;
  }
};

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const token = getAccessToken();
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Session expired. Please login again.');
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch products');
    return data.data || [];
  } catch (error) {

    throw error;
  }
};

// Create a new product - accepts JSON payload
export const createProduct = async (payload: any): Promise<Product> => {
  try {
    const token = getAccessToken();
    
    // Log the payload being sent

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Session expired. Please login again.');
    }

    // Get response text first to see what we're dealing with
    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {

      throw new Error(`Invalid response from server: ${responseText.substring(0, 100)}`);
    }

    if (!response.ok) {
      throw new Error(data.message || `Failed to create product (${response.status})`);
    }
    
    return data.data;
  } catch (error) {

    throw error;
  }
};

// Update a product - accepts JSON payload
export const updateProduct = async (id: string, payload: any): Promise<Product> => {
  try {
    const token = getAccessToken();
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Session expired. Please login again.');
    }

    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error('Invalid response from server');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update product');
    }
    
    return data.data;
  } catch (error) {

    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const token = getAccessToken();
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete product');
    }
  } catch (error) {

    throw error;
  }
};
