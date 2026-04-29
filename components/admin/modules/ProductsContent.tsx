'use client';

import { useState, useEffect, useCallback } from 'react';
import DataTable from '@/components/admin/DataTable';
import ProductModal from '@/components/admin/ProductModal';
import ProductViewModal from '@/components/admin/ProductViewModal';
import DeleteConfirmModal from '@/components/admin/DeleteConfirmModal';
import Toast from '@/components/admin/Toast';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
} from '@/lib/services/productService';
import { getCategories, Category } from '@/lib/services/categoryService';

export default function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'yes' | 'no'>('all');
  const [filterCustomizable, setFilterCustomizable] = useState<'all' | 'yes' | 'no'>('all');
  const [filterMetalType, setFilterMetalType] = useState<'all' | 'gold' | 'silver'>('all');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // View modal state
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [productToView, setProductToView] = useState<Product | null>(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // Fetch both categories and products, then merge
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch categories and products in parallel
      const [categoriesData, productsData] = await Promise.all([
        getCategories(),
        getProducts()
      ]);

      setCategories(categoriesData);
      
      // Create a map of category_id to category_name
      // Include both parent categories and subcategories
      const map: Record<string, string> = {};
      categoriesData.forEach(category => {
        map[category.id] = category.name;
        
        // Also add subcategories if they exist
        if (category.children && Array.isArray(category.children)) {
          category.children.forEach((subcat: any) => {
            map[subcat.id] = subcat.name;
          });
        }
      });
      setCategoryMap(map);

      // Add category_name to each product
      const productsWithCategoryNames = productsData.map(product => {
        const categoryName = product.category_id ? map[product.category_id] : undefined;
        
        if (product.category_id && !categoryName) {

        }

        return {
          ...product,
          category_name: categoryName || (product.category_id ? 'Unknown Category' : undefined)
        };
      });

      setProducts(productsWithCategoryNames);
      setFilteredProducts(productsWithCategoryNames);
    } catch (error) {

      showToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Featured filter
    if (filterFeatured !== 'all') {
      const isFeatured = filterFeatured === 'yes';
      filtered = filtered.filter(product => {
        const productFeatured = product.is_featured === true || product.is_featured === 1 || product.is_featured === '1';
        return productFeatured === isFeatured;
      });
    }

    // Customizable filter
    if (filterCustomizable !== 'all') {
      const isCustomizable = filterCustomizable === 'yes';
      filtered = filtered.filter(product => {
        const productCustomizable = product.is_customizable === true || product.is_customizable === 1 || product.is_customizable === '1';
        return productCustomizable === isCustomizable;
      });
    }

    // Metal type filter
    if (filterMetalType !== 'all') {
      filtered = filtered.filter(product => product.metal_type === filterMetalType);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, filterFeatured, filterCustomizable, filterMetalType]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilterFeatured('all');
    setFilterCustomizable('all');
    setFilterMetalType('all');
  };

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handlers
  const handleAddClick = () => {
    setSelectedProduct(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleEdit = async (product: Product) => {
    try {
      // Fetch full product details using slug
      const slug = product.slug || product.id;
      const fullProduct = await getProduct(slug);
      setSelectedProduct(fullProduct);
      setModalMode('edit');
      setModalOpen(true);
    } catch (err: any) {
      showToast(err.message || 'Failed to load product details', 'error');
    }
  };

  const handleView = async (product: Product) => {
    try {
      // Fetch full product details for viewing
      const slug = product.slug || product.id;
      const fullProduct = await getProduct(slug);
      setProductToView(fullProduct);
      setViewModalOpen(true);
    } catch (err: any) {
      showToast(err.message || 'Failed to load product details', 'error');
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleModalSubmit = async (data: any) => {
    if (modalMode === 'create') {
      const result = await createProduct(data);

      showToast('Product created successfully', 'success');
    } else if (selectedProduct) {
      const result = await updateProduct(selectedProduct.id, data);

      showToast('Product updated successfully', 'success');
    }
    await fetchData();
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setDeleteLoading(true);
    try {
      await deleteProduct(productToDelete.id);
      showToast('Product deleted successfully', 'success');
      setDeleteModalOpen(false);
      setProductToDelete(null);
      await fetchData();
    } catch {
      showToast('Failed to delete product', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      sortable: false,
      render: (value: any, row: any) => {
        // Get the first image from the images array
        const firstImage = row.images && row.images.length > 0 
          ? row.images[0] 
          : null;
        
        const imageUrl = firstImage?.url || firstImage;
        
        return (
          <div className="flex items-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={row.name || 'Product'}
                className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiAxNkMyMC40MTgzIDE2IDI0IDE5LjU4MTcgMjQgMjRDMjQgMjguNDE4MyAyMC40MTgzIDMyIDE2IDMyQzExLjU4MTcgMzIgOCAyOC40MTgzIDggMjRDOCAxOS41ODE3IDExLjU4MTcgMTYgMTYgMTZaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yNiAxNkMzMC40MTgzIDE2IDM0IDE5LjU4MTcgMzQgMjRDMzQgMjguNDE4MyAzMC40MTgzIDMyIDI2IDMyQzIxLjU4MTcgMzIgMTggMjguNDE4MyAxOCAyNEMxOCAxOS41ODE3IDIxLjU4MTcgMTYgMjYgMTZaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
                }}
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'name',
      label: 'Product Name',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{value}</div>
        </div>
      ),
    },
    {
      key: 'category_name',
      label: 'Category',
      sortable: true,
      render: (value: string, row: any) => (
        <div className="text-sm text-gray-700">
          {value || '—'}
        </div>
      ),
    },
    {
      key: 'base_weight',
      label: 'Base Weight (g)',
      sortable: true,
      render: (value: number | undefined) => (
        <div className="text-sm text-gray-700">
          {value !== undefined && value !== null ? value : '—'}
        </div>
      ),
    },
    {
      key: 'is_featured',
      label: 'Featured',
      sortable: false,
      render: (value: any) => {
        const isTrue = value === true || value === 1 || value === '1';
        return (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              isTrue ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isTrue ? 'Yes' : 'No'}
          </span>
        );
      },
    },
    {
      key: 'is_customizable',
      label: 'Customizable',
      sortable: false,
      render: (value: any, row: any) => {
        // Handle numeric values (1/0) and boolean values (true/false)
        const isTrue = value === true || value === 1 || value === '1';
        return (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              isTrue ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isTrue ? 'Yes' : 'No'}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">All Products</h3>
          <p className="text-sm text-gray-500 mt-1">
            Manage your product inventory ({filteredProducts.length} of {products.length} products)
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Product</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, description, or category..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Featured Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value as 'all' | 'yes' | 'no')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            >
              <option value="all">All Products</option>
              <option value="yes">Featured Only</option>
              <option value="no">Not Featured</option>
            </select>
          </div>

          {/* Customizable Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customizable</label>
            <select
              value={filterCustomizable}
              onChange={(e) => setFilterCustomizable(e.target.value as 'all' | 'yes' | 'no')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            >
              <option value="all">All Products</option>
              <option value="yes">Customizable</option>
              <option value="no">Not Customizable</option>
            </select>
          </div>

          {/* Metal Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Metal Type</label>
            <select
              value={filterMetalType}
              onChange={(e) => setFilterMetalType(e.target.value as 'all' | 'gold' | 'silver')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            >
              <option value="all">All Types</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || filterFeatured !== 'all' || filterCustomizable !== 'all' || filterMetalType !== 'all') && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredProducts}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        itemsPerPage={10}
        emptyMessage={
          searchTerm || filterFeatured !== 'all' || filterCustomizable !== 'all' || filterMetalType !== 'all'
            ? "No products match your filters"
            : "No products found"
        }
      />

      {/* Create / Edit Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        product={selectedProduct}
        mode={modalMode}
      />

      {/* View Modal */}
      <ProductViewModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setProductToView(null);
        }}
        product={productToView}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          if (!deleteLoading) {
            setDeleteModalOpen(false);
            setProductToDelete(null);
          }
        }}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
