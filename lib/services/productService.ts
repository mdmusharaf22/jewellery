// Product Service - API calls for product CRUD operations

import { getAccessToken } from '../auth';
import { handleUnauthorized } from '../api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  short_description?: string;
  category_id?: string;
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
    console.error('Error fetching product:', error);
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
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Create a new product - accepts JSON payload
export const createProduct = async (payload: any): Promise<Product> => {
  try {
    const token = getAccessToken();
    
    // Log the payload being sent
    console.log('Sending JSON payload:', JSON.stringify(payload, null, 2));
    
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
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      throw new Error(`Invalid response from server: ${responseText.substring(0, 100)}`);
    }

    if (!response.ok) {
      throw new Error(data.message || `Failed to create product (${response.status})`);
    }
    
    return data.data;
  } catch (error) {
    console.error('Error creating product:', error);
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
    console.error('Error updating product:', error);
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
    console.error('Error deleting product:', error);
    throw error;
  }
};
