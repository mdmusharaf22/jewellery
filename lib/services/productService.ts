// Product Service - API calls for product CRUD operations

import { api } from '../api';

export interface Product {
  id: string;
  name: string;
  base_weight?: number;
  is_featured?: boolean;
  is_customizable?: boolean;
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

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (payload: CreateProductPayload): Promise<Product> => {
  try {
    const response = await api.post('/products', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id: string, payload: UpdateProductPayload): Promise<Product> => {
  try {
    const response = await api.put(`/products/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
