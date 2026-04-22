'use client';

import { useState, useEffect, useCallback } from 'react';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import Toast from '@/components/admin/Toast';

interface SubCategory {
  id: string;
  name: string;
  slug?: string;
  parent_id: string;
  created_at?: string;
}

interface SubCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  parentCategory: { id: string; name: string } | null;
}

const API = process.env.NEXT_PUBLIC_API_BASE_URL;
const getToken = () =>
  typeof window !== 'undefined' ? sessionStorage.getItem('admin_access_token') : '';

export default function SubCategoriesModal({
  isOpen,
  onClose,
  parentCategory,
}: SubCategoriesModalProps) {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editTarget, setEditTarget] = useState<SubCategory | null>(null);
  const [name, setName] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<SubCategory | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') =>
    setToast({ message, type });

  const fetchSubCategories = useCallback(async () => {
    if (!parentCategory) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/categories`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      const all: SubCategory[] = data.data || [];
      console.log('All categories:', all);
      console.log('Parent ID:', parentCategory.id);
      // Filter by parent_id — compare as strings to be safe
      const subs = all.filter((c) => String(c.parent_id) === String(parentCategory.id));
      console.log('Filtered subs:', subs);
      setSubCategories(subs);
    } catch {
      showToast('Failed to load subcategories', 'error');
    } finally {
      setLoading(false);
    }
  }, [parentCategory]);

  useEffect(() => {
    if (isOpen && parentCategory) {
      fetchSubCategories();
      resetForm();
    }
  }, [isOpen, parentCategory, fetchSubCategories]);

  const resetForm = () => {
    setName('');
    setFormMode('create');
    setEditTarget(null);
    setFormError('');
  };

  const handleEditClick = (sub: SubCategory) => {
    setEditTarget(sub);
    setName(sub.name);
    setFormMode('edit');
    setFormError('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setFormError('Name is required'); return; }
    setFormError('');
    setFormLoading(true);

    try {
      const isEdit = formMode === 'edit' && editTarget;
      const url = isEdit
        ? `${API}/categories/${editTarget.id}`
        : `${API}/categories`;
      const method = isEdit ? 'PUT' : 'POST';
      const body: any = { name: name.trim() };
      if (!isEdit) body.parent_id = parentCategory!.id;

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');

      showToast(
        isEdit ? 'Subcategory updated' : 'Subcategory created',
        'success'
      );
      resetForm();
      // Re-fetch with a slight delay to ensure API consistency
      setTimeout(() => fetchSubCategories(), 300);
    } catch (err: any) {
      setFormError(err.message || 'Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API}/categories/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      showToast('Subcategory deleted', 'success');
      setDeleteTarget(null);
      fetchSubCategories();
    } catch (err: any) {
      showToast(err.message || 'Delete failed', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />

        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Subcategories
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  Under: <span className="font-medium text-amber-600">{parentCategory?.name}</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Create / Edit Form */}
              <form onSubmit={handleFormSubmit} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  {formMode === 'create' ? 'Add Subcategory' : `Edit "${editTarget?.name}"`}
                </h4>

                {formError && (
                  <p className="text-red-600 text-xs mb-2">{formError}</p>
                )}

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Subcategory name"
                    disabled={formLoading}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={formLoading || !name.trim()}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {formLoading && (
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {formMode === 'create' ? 'Add' : 'Update'}
                  </button>
                  {formMode === 'edit' && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              {/* Subcategory List */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Existing Subcategories
                  {subCategories.length > 0 && (
                    <span className="ml-2 text-xs font-normal text-gray-400">({subCategories.length})</span>
                  )}
                </h4>

                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
                  </div>
                ) : subCategories.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No subcategories yet. Add one above.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                    {subCategories.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">{sub.name}</p>
                          {sub.slug && (
                            <p className="text-xs text-gray-400 mt-0.5">{sub.slug}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <button
                            onClick={() => handleEditClick(sub)}
                            className="text-blue-600 hover:text-blue-800 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(sub)}
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirm */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
        title="Delete Subcategory"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This cannot be undone.`}
      />

      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </>
  );
}
