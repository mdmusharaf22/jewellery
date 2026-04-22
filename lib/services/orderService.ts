// Order Service - API calls for orders

import { api } from '../api';

export interface Order {
  id: string;
  [key: string]: any;
}

export interface OrdersMeta {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface OrdersResponse {
  orders: Order[];
  meta: OrdersMeta;
}

// Get all orders
export const getOrders = async (page = 1, limit = 20): Promise<OrdersResponse> => {
  try {
    const response = await api.get(`/orders?page=${page}&limit=${limit}`);
    return {
      orders: response.data || [],
      meta: response.meta || { total: 0, page: 1, limit, total_pages: 0 },
    };
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
