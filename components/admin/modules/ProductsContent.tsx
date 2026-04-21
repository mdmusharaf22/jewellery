'use client';

import { useState } from 'react';
import DataTable from '@/components/admin/DataTable';

export default function ProductsContent() {
  const [loading, setLoading] = useState(false);

  // Static product data - will be replaced with API call
  const products = [
    { id: 1, name: 'Gold Chain 22K', sku: 'GC-001', category: 'Gold Chains', price: 45000, stock: 12, status: 'Active' },
    { id: 2, name: 'Diamond Ring Solitaire', sku: 'DR-002', category: 'Diamond Rings', price: 85000, stock: 5, status: 'Active' },
    { id: 3, name: 'Silver Bangle Set', sku: 'SB-003', category: 'Silver Bangles', price: 8500, stock: 25, status: 'Active' },
    { id: 4, name: 'Gold Earrings Studs', sku: 'GE-004', category: 'Gold Earrings', price: 15000, stock: 18, status: 'Active' },
    { id: 5, name: 'Platinum Chain', sku: 'PC-005', category: 'Platinum Chains', price: 95000, stock: 3, status: 'Active' },
    { id: 6, name: 'Diamond Necklace', sku: 'DN-006', category: 'Diamond Necklaces', price: 125000, stock: 2, status: 'Active' },
    { id: 7, name: 'Gold Bangle 22K', sku: 'GB-007', category: 'Gold Bangles', price: 35000, stock: 15, status: 'Active' },
    { id: 8, name: 'Silver Ring', sku: 'SR-008', category: 'Silver Rings', price: 2500, stock: 40, status: 'Active' },
    { id: 9, name: 'Gold Necklace Traditional', sku: 'GN-009', category: 'Gold Necklaces', price: 75000, stock: 8, status: 'Active' },
    { id: 10, name: 'Diamond Earrings Drops', sku: 'DE-010', category: 'Diamond Earrings', price: 65000, stock: 6, status: 'Active' },
    { id: 11, name: 'Silver Chain', sku: 'SC-011', category: 'Silver Chains', price: 3500, stock: 30, status: 'Active' },
    { id: 12, name: 'Gold Ring Wedding Band', sku: 'GR-012', category: 'Gold Rings', price: 28000, stock: 20, status: 'Active' },
    { id: 13, name: 'Platinum Ring Engagement', sku: 'PR-013', category: 'Platinum Rings', price: 110000, stock: 4, status: 'Active' },
    { id: 14, name: 'Diamond Bracelet', sku: 'DB-014', category: 'Diamond Bracelets', price: 95000, stock: 3, status: 'Active' },
    { id: 15, name: 'Gold Pendant', sku: 'GP-015', category: 'Gold Pendants', price: 18000, stock: 22, status: 'Active' },
    { id: 16, name: 'Silver Earrings Hoops', sku: 'SE-016', category: 'Silver Earrings', price: 4500, stock: 35, status: 'Active' },
    { id: 17, name: 'Gold Anklet', sku: 'GA-017', category: 'Gold Anklets', price: 22000, stock: 10, status: 'Active' },
    { id: 18, name: 'Diamond Ring Halo', sku: 'DR-018', category: 'Diamond Rings', price: 98000, stock: 4, status: 'Active' },
    { id: 19, name: 'Gold Mangalsutra', sku: 'GM-019', category: 'Gold Mangalsutra', price: 42000, stock: 14, status: 'Active' },
    { id: 20, name: 'Silver Necklace Pendant', sku: 'SN-020', category: 'Silver Necklaces', price: 5500, stock: 28, status: 'Active' },
    { id: 21, name: 'Gold Chain Rope Design', sku: 'GC-021', category: 'Gold Chains', price: 52000, stock: 9, status: 'Active' },
    { id: 22, name: 'Diamond Pendant Heart', sku: 'DP-022', category: 'Diamond Pendants', price: 48000, stock: 7, status: 'Active' },
    { id: 23, name: 'Platinum Bracelet', sku: 'PB-023', category: 'Platinum Bracelets', price: 88000, stock: 2, status: 'Low Stock' },
    { id: 24, name: 'Gold Earrings Jhumka', sku: 'GE-024', category: 'Gold Earrings', price: 32000, stock: 16, status: 'Active' },
    { id: 25, name: 'Silver Bangle Plain', sku: 'SB-025', category: 'Silver Bangles', price: 6500, stock: 45, status: 'Active' },
    { id: 26, name: 'Diamond Necklace Choker', sku: 'DN-026', category: 'Diamond Necklaces', price: 145000, stock: 1, status: 'Low Stock' },
    { id: 27, name: 'Gold Ring Cocktail', sku: 'GR-027', category: 'Gold Rings', price: 38000, stock: 11, status: 'Active' },
    { id: 28, name: 'Silver Ring Adjustable', sku: 'SR-028', category: 'Silver Rings', price: 1800, stock: 50, status: 'Active' },
    { id: 29, name: 'Gold Nose Pin', sku: 'GN-029', category: 'Gold Nose Pins', price: 8500, stock: 25, status: 'Active' },
    { id: 30, name: 'Diamond Earrings Studs', sku: 'DE-030', category: 'Diamond Earrings', price: 55000, stock: 8, status: 'Active' },
    { id: 31, name: 'Platinum Necklace', sku: 'PN-031', category: 'Platinum Necklaces', price: 125000, stock: 2, status: 'Low Stock' },
    { id: 32, name: 'Gold Bracelet Link', sku: 'GB-032', category: 'Gold Bracelets', price: 48000, stock: 6, status: 'Active' },
    { id: 33, name: 'Silver Pendant Om', sku: 'SP-033', category: 'Silver Pendants', price: 2200, stock: 38, status: 'Active' },
    { id: 34, name: 'Gold Chain Box Design', sku: 'GC-034', category: 'Gold Chains', price: 58000, stock: 7, status: 'Active' },
    { id: 35, name: 'Diamond Ring Princess Cut', sku: 'DR-035', category: 'Diamond Rings', price: 115000, stock: 3, status: 'Active' },
    { id: 36, name: 'Gold Earrings Chandbali', sku: 'GE-036', category: 'Gold Earrings', price: 42000, stock: 12, status: 'Active' },
    { id: 37, name: 'Silver Anklet', sku: 'SA-037', category: 'Silver Anklets', price: 3800, stock: 32, status: 'Active' },
    { id: 38, name: 'Gold Bangle Kada', sku: 'GB-038', category: 'Gold Bangles', price: 45000, stock: 10, status: 'Active' },
    { id: 39, name: 'Diamond Bracelet Tennis', sku: 'DB-039', category: 'Diamond Bracelets', price: 135000, stock: 2, status: 'Low Stock' },
    { id: 40, name: 'Platinum Earrings', sku: 'PE-040', category: 'Platinum Earrings', price: 72000, stock: 5, status: 'Active' },
  ];

  const columns = [
    {
      key: 'name',
      label: 'Product Name',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">{row.sku}</div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-700">{value}</div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm font-medium text-gray-900">₹{value.toLocaleString()}</div>
      ),
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      render: (value: number) => (
        <div className="text-sm text-gray-900">
          <span className={value < 5 ? 'text-red-600 font-semibold' : ''}>{value}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {value}
        </span>
      ),
    },
  ];

  const handleEdit = (product: any) => {
    console.log('Edit product:', product);
    // TODO: Implement edit functionality
  };

  const handleDelete = (product: any) => {
    console.log('Delete product:', product);
    // TODO: Implement delete functionality
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">All Products</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Product</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={products}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={10}
        emptyMessage="No products found"
      />
    </div>
  );
}
