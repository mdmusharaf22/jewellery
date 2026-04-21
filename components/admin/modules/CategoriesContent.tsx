'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import CategoryModal from '@/components/admin/CategoryModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import AdminToast from '@/components/admin/Toast';

export default function CategoriesContent() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('admin_access_token')}`,
        },
      });
      const data = await response.json();
      if (data.success && data.data) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      showToast('Failed to load categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData: { name: string }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('admin_access_token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast('Category created successfully', 'success');
        fetchCategories();
        setShowModal(false);
      } else {
        throw new Error(data.message || 'Failed to create category');
      }
    } catch (error: any) {
      showToast(error.message || 'Failed to create category', 'error');
      throw error;
    }
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleUpdate = async (formData: { name: string }) => {
    if (!selectedCategory) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${selectedCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('admin_access_token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast('Category updated successfully', 'success');
        fetchCategories();
        setShowModal(false);
        setSelectedCategory(null);
      } else {
        throw new Error(data.message || 'Failed to update category');
      }
    } catch (error: any) {
      showToast(error.message || 'Failed to update category', 'error');
      throw error;
    }
  };

  const handleDeleteClick = (category: any) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${selectedCategory.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('admin_access_token')}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast('Category deleted successfully', 'success');
        fetchCategories();
        setShowDeleteModal(false);
        setSelectedCategory(null);
      } else {
        throw new Error(data.message || 'Failed to delete category');
      }
    } catch (error: any) {
      showToast(error.message || 'Failed to delete category', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const columns = [
    {
      key: 'name',
      label: 'Category Name',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-500 font-mono text-xs">{value.substring(0, 8)}...</div>
      ),
    },
    {
      key: 'created_at',
      label: 'Created At',
      sortable: true,
      render: (value: string) => (
        <div className="text-sm text-gray-700">
          {value ? new Date(value).toLocaleDateString() : '-'}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Manage Categories</h3>
          <p className="text-sm text-gray-500 mt-1">View and manage all product categories</p>
        </div>
        <button
          onClick={() => {
            setSelectedCategory(null);
            setModalMode('create');
            setShowModal(true);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Category</span>
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        itemsPerPage={10}
        emptyMessage="No categories found"
      />

      {/* Category Modal */}
      <CategoryModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCategory(null);
        }}
        onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
        category={selectedCategory}
        mode={modalMode}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
        loading={deleteLoading}
      />

      {/* Toast Notification */}
      {toast && (
        <AdminToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
