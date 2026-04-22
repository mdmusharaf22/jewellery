'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/admin/DataTable';
import CategoryModal from '@/components/admin/CategoryModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import AdminToast from '@/components/admin/Toast';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;
const getToken = () =>
  typeof window !== 'undefined' ? sessionStorage.getItem('admin_access_token') : '';

export default function CategoriesContent() {
  // View: 'categories' | 'subcategories'
  const [view, setView] = useState<'categories' | 'subcategories'>('categories');
  const [activeParent, setActiveParent] = useState<any>(null);

  // Categories state
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Subcategories state
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [subLoading, setSubLoading] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' | 'info') =>
    setToast({ message, type });

  // ── Fetch all categories ──────────────────────────────────────────────────
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/categories?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (data.success && data.data) {
        // API returns nested: parent_id === null are top-level
        setCategories(data.data.filter((c: any) => !c.parent_id));
      }
    } catch {
      showToast('Failed to load categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  // ── Open subcategory view ─────────────────────────────────────────────────
  const openSubcategories = async (parent: any) => {
    setActiveParent(parent);
    setView('subcategories');
    setSubLoading(true);
    try {
      const res = await fetch(`${API}/categories?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (data.success && data.data) {
        const allChildren: any[] = [];
        data.data.forEach((cat: any) => {
          if (cat.children?.length) allChildren.push(...cat.children);
        });
        setSubCategories(allChildren.filter((c: any) => c.parent_id === parent.id));
      }
    } catch {
      showToast('Failed to load subcategories', 'error');
    } finally {
      setSubLoading(false);
    }
  };

  const goBack = () => {
    setView('categories');
    setActiveParent(null);
    setSubCategories([]);
  };

  // Re-fetch subcategories for the active parent
  const refreshSubCategories = async () => {
    if (!activeParent) return;
    setSubLoading(true);
    try {
      const res = await fetch(`${API}/categories?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (data.success && data.data) {
        // Collect all children across the flat+nested response
        const allItems: any[] = [];
        data.data.forEach((cat: any) => {
          if (cat.children && cat.children.length > 0) {
            allItems.push(...cat.children);
          }
        });
        // Filter by parent_id
        const subs = allItems.filter((c: any) => c.parent_id === activeParent.id);
        setSubCategories(subs);

        // Also update activeParent name in case it was renamed
        const updatedParent = data.data.find((c: any) => c.id === activeParent.id);
        if (updatedParent) setActiveParent(updatedParent);
        
        // IMPORTANT: Also refresh the main categories list to update the subcategory count
        setCategories(data.data.filter((c: any) => !c.parent_id));
      }
    } catch {
      showToast('Failed to refresh subcategories', 'error');
    } finally {
      setSubLoading(false);
    }
  };

  // ── CRUD handlers ─────────────────────────────────────────────────────────
  const handleCreate = async (formData: { name: string }) => {
    const isSubView = view === 'subcategories';
    const payload: any = { name: formData.name };
    if (isSubView) payload.parent_id = activeParent!.id;

    const res = await fetch(`${API}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create');

    showToast(`${isSubView ? 'Subcategory' : 'Category'} created`, 'success');
    if (isSubView) {
      await refreshSubCategories();
    } else {
      await fetchCategories();
    }
  };

  const handleUpdate = async (formData: { name: string }) => {
    if (!selectedItem) return;
    const payload: any = { name: formData.name };
    if (view === 'subcategories') payload.parent_id = activeParent.id;

    const res = await fetch(`${API}/categories/${selectedItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update');

    showToast(`${view === 'subcategories' ? 'Subcategory' : 'Category'} updated`, 'success');
    setSelectedItem(null);
    if (view === 'subcategories') {
      await refreshSubCategories();
    } else {
      await fetchCategories();
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setDeleteLoading(true);
    try {
      // If deleting a parent category, fetch fresh data and delete all its children first
      if (view === 'categories') {
        // Fetch fresh category data to get all children
        const res = await fetch(`${API}/categories?t=${Date.now()}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        const data = await res.json();
        
        if (data.success && data.data) {
          // Find the category being deleted with its children
          const categoryToDelete = data.data.find((c: any) => c.id === selectedItem.id);
          
          // Delete all children first if they exist
          if (categoryToDelete?.children && categoryToDelete.children.length > 0) {
            await Promise.all(
              categoryToDelete.children.map((child: any) =>
                fetch(`${API}/categories/${child.id}`, {
                  method: 'DELETE',
                  headers: { Authorization: `Bearer ${getToken()}` },
                })
              )
            );
          }
        }
      }

      // Now delete the parent category or subcategory
      const res = await fetch(`${API}/categories/${selectedItem.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete');

      showToast(`${view === 'subcategories' ? 'Subcategory' : 'Category'} deleted`, 'success');
      setShowDeleteModal(false);
      setSelectedItem(null);
      if (view === 'subcategories') {
        await refreshSubCategories();
      } else {
        await fetchCategories();
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to delete', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  // ── Columns ───────────────────────────────────────────────────────────────
  const categoryColumns = [
    {
      key: 'name',
      label: 'Category Name',
      sortable: true,
      render: (value: string, row: any) => (
        <button
          onClick={() => openSubcategories(row)}
          className="text-sm font-medium text-amber-600 hover:text-amber-800 hover:underline text-left transition"
        >
          {value}
        </button>
      ),
    },
    {
      key: 'children',
      label: 'Subcategories',
      sortable: false,
      render: (value: any[]) => (
        <span className="text-sm text-gray-600">
          {value?.length || 0}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Created At',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-600">
          {value ? new Date(value).toLocaleDateString() : '—'}
        </span>
      ),
    },
  ];

  const subCategoryColumns = [
    {
      key: 'name',
      label: 'Subcategory Name',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: 'created_at',
      label: 'Created At',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-600">
          {value ? new Date(value).toLocaleDateString() : '—'}
        </span>
      ),
    },
  ];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          {/* Breadcrumb for subcategories view */}
          {view === 'subcategories' && (
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={goBack}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-amber-600 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Categories
              </button>
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-sm font-medium text-amber-600">{activeParent?.name}</span>
            </div>
          )}

          {/* Title */}
          {view === 'categories' ? (
            <h3 className="text-xl font-semibold text-gray-900">Categories</h3>
          ) : (
            <h3 className="text-xl font-semibold text-gray-900">
              Subcategories
              <span className="ml-2 text-base font-normal text-gray-500">
                ({subCategories.length})
              </span>
            </h3>
          )}
        </div>

        <button
          onClick={() => {
            setSelectedItem(null);
            setModalMode('create');
            setShowModal(true);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {view === 'categories' ? 'Create Category' : 'Add Subcategory'}
        </button>
      </div>

      {/* Table */}
      {view === 'categories' ? (
        <DataTable
          columns={categoryColumns}
          data={categories}
          loading={loading}
          onEdit={(row) => { setSelectedItem(row); setModalMode('edit'); setShowModal(true); }}
          onDelete={(row) => { setSelectedItem(row); setShowDeleteModal(true); }}
          itemsPerPage={10}
          emptyMessage="No categories found"
        />
      ) : (
        <DataTable
          columns={subCategoryColumns}
          data={subCategories}
          loading={subLoading}
          onEdit={(row) => { setSelectedItem(row); setModalMode('edit'); setShowModal(true); }}
          onDelete={(row) => { setSelectedItem(row); setShowDeleteModal(true); }}
          itemsPerPage={10}
          emptyMessage="No subcategories yet"
        />
      )}

      {/* Category / Subcategory Modal */}
      <CategoryModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setSelectedItem(null); }}
        onSubmit={modalMode === 'create' ? handleCreate : handleUpdate}
        category={selectedItem}
        mode={modalMode}
        label={view === 'subcategories' ? 'Subcategory' : 'Category'}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setSelectedItem(null); }}
        onConfirm={handleDelete}
        title={`Delete ${view === 'subcategories' ? 'Subcategory' : 'Category'}`}
        message={`Are you sure you want to delete "${selectedItem?.name}"? This cannot be undone.`}
        loading={deleteLoading}
      />

      {/* Toast */}
      {toast && (
        <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
