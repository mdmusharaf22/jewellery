// Category Service - API calls for category CRUD operations

import { api } from '../api';

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCategoryPayload {
  name: string;
}

export interface UpdateCategoryPayload {
  name: string;
}

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get('/categories');
    return response.data || [];
  } catch (error) {

    throw error;
  }
};

// Create a new category
export const createCategory = async (payload: CreateCategoryPayload): Promise<Category> => {
  try {
    const response = await api.post('/categories', payload);
    return response.data;
  } catch (error) {

    throw error;
  }
};

// Update a category
export const updateCategory = async (id: string, payload: UpdateCategoryPayload): Promise<Category> => {
  try {
    const response = await api.put(`/categories/${id}`, payload);
    return response.data;
  } catch (error) {

    throw error;
  }
};

// Delete a category
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await api.delete(`/categories/${id}`);
  } catch (error) {

    throw error;
  }
};
