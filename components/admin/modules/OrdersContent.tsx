'use client';

import { useState } from 'react';
import DataTable from '@/components/admin/DataTable';

export default function OrdersContent() {
  const [loading, setLoading] = useState(false);

  // Static order data - will be replaced with API call
  const orders = [
    { id: 1, orderNumber: '#ORD-1001', customer: 'Rajesh Kumar', date: '2026-04-20', total: 125000, status: 'Completed', items: 3 },
    { id: 2, orderNumber: '#ORD-1002', customer: 'Priya Sharma', date: '2026-04-20', total: 45000, status: 'Processing', items: 1 },
    { id: 3, orderNumber: '#ORD-1003', customer: 'Amit Patel', date: '2026-04-19', total: 85000, status: 'Completed', items: 2 },
    { id: 4, orderNumber: '#ORD-1004', customer: 'Sneha Reddy', date: '2026-04-19', total: 35000, status: 'Pending', items: 1 },
    { id: 5, orderNumber: '#ORD-1005', customer: 'Vikram Singh', date: '2026-04-18', total: 95000, status: 'Completed', items: 2 },
    { id: 6, orderNumber: '#ORD-1006', customer: 'Anita Desai', date: '2026-04-18', total: 15000, status: 'Cancelled', items: 1 },
    { id: 7, orderNumber: '#ORD-1007', customer: 'Rahul Verma', date: '2026-04-17', total: 65000, status: 'Processing', items: 2 },
    { id: 8, orderNumber: '#ORD-1008', customer: 'Kavita Nair', date: '2026-04-17', total: 28000, status: 'Completed', items: 1 },
  ];

  const columns = [
    {
      key: 'orderNumber',
      label: 'Order Number',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-900">{value}</div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-700">{value}</div>
      ),
    },
    {
      key: 'items',
      label: 'Items',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-700">{value}</div>
      ),
    },
    {
      key: 'total',
      label: 'Total',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm font-medium text-gray-900">₹{value.toLocaleString()}</div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => {
        const statusColors: Record<string, string> = {
          Completed: 'bg-green-100 text-green-800',
          Processing: 'bg-blue-100 text-blue-800',
          Pending: 'bg-yellow-100 text-yellow-800',
          Cancelled: 'bg-red-100 text-red-800',
        };
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </span>
        );
      },
    },
  ];

  const handleEdit = (order: any) => {
    console.log('View order:', order);
    // TODO: Implement view order details
  };

  const handleDelete = (order: any) => {
    console.log('Cancel order:', order);
    // TODO: Implement cancel order
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <p className="text-sm text-gray-500 mt-1">View and manage customer orders</p>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={10}
        emptyMessage="No orders found"
      />
    </div>
  );
}
