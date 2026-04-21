'use client';

import { useState } from 'react';
import DataTable from '@/components/admin/DataTable';

export default function CustomersContent() {
  const [loading, setLoading] = useState(false);

  // Static customer data - will be replaced with API call
  const customers = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', phone: '+91 98765 43210', orders: 12, totalSpent: 450000, joinDate: '2025-01-15' },
    { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43211', orders: 8, totalSpent: 320000, joinDate: '2025-02-20' },
    { id: 3, name: 'Amit Patel', email: 'amit.patel@email.com', phone: '+91 98765 43212', orders: 15, totalSpent: 580000, joinDate: '2024-11-10' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha.reddy@email.com', phone: '+91 98765 43213', orders: 5, totalSpent: 185000, joinDate: '2025-03-05' },
    { id: 5, name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 98765 43214', orders: 20, totalSpent: 750000, joinDate: '2024-08-22' },
    { id: 6, name: 'Anita Desai', email: 'anita.desai@email.com', phone: '+91 98765 43215', orders: 3, totalSpent: 95000, joinDate: '2025-04-01' },
  ];

  const columns = [
    {
      key: 'name',
      label: 'Customer Name',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-700">{value}</div>
      ),
    },
    {
      key: 'orders',
      label: 'Orders',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-900">{value}</div>
      ),
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm font-medium text-gray-900">₹{value.toLocaleString()}</div>
      ),
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-700">{value}</div>
      ),
    },
  ];

  const handleEdit = (customer: any) => {
    console.log('View customer:', customer);
    // TODO: Implement view customer details
  };

  const handleDelete = (customer: any) => {
    console.log('Delete customer:', customer);
    // TODO: Implement delete customer
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Customer Database</h3>
        <p className="text-sm text-gray-500 mt-1">Manage customer information and history</p>
      </div>

      <DataTable
        columns={columns}
        data={customers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={10}
        emptyMessage="No customers found"
      />
    </div>
  );
}
