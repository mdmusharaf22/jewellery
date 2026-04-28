'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; metal_type?: string; image_url?: string }) => Promise<void>;
  category?: { id: string; name: string; metal_type?: string; image_url?: string } | null;
  mode: 'create' | 'edit';
  label?: string; // e.g. 'Subcategory'
  isParentCategory?: boolean; // New prop to determine if this is a parent category
}

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  category,
  mode,
  label = 'Category',
  isParentCategory = false,
}: CategoryModalProps) {
  const [name, setName] = useState('');
  const [metalType, setMetalType] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (category && mode === 'edit') {
      setName(category.name);
      setMetalType(category.metal_type || '');
      setImageUrl(category.image_url || '');
    } else {
      setName('');
      setMetalType('');
      setImageUrl('');
      setImageFile(null);
    }
    setError('');
  }, [category, mode, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;
    setUploadingImage(true);
    setError('');
    try {
      const { uploadImage } = await import('@/lib/services/uploadService');
      const result = await uploadImage(imageFile);
      const url = result.url || result.image_url || result.file_url || '';
      if (url) {
        setImageUrl(url);
        setImageFile(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = () => {
    setImageUrl('');
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    if (isParentCategory && !metalType) {
      setError('Metal type is required');
      return;
    }

    setLoading(true);
    try {
      const submitData: { name: string; metal_type?: string; image_url?: string } = { name: name.trim() };
      if (isParentCategory) {
        submitData.metal_type = metalType;
        if (imageUrl.trim()) {
          submitData.image_url = imageUrl.trim();
        }
      }
      await onSubmit(submitData);
      setName('');
      setMetalType('');
      setImageUrl('');
      setImageFile(null);
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setName('');
      setMetalType('');
      setImageUrl('');
      setImageFile(null);
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
            <h3 className="text-xl font-semibold text-gray-900">
              {mode === 'create' ? `Create New ${label}` : `Edit ${label}`}
            </h3>
            <button
              onClick={handleClose}
              disabled={loading}
              className="text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-2">
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Category Name Field */}
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                  {label} Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="categoryName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={`e.g., Gold Jewellery`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  disabled={loading}
                  autoFocus
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter a descriptive name for the {label.toLowerCase()}
                </p>
              </div>

              {/* Metal Type Dropdown - Only for Parent Categories */}
              {isParentCategory && (
                <div>
                  <label htmlFor="metalType" className="block text-sm font-medium text-gray-700 mb-2">
                    Metal Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="metalType"
                    value={metalType}
                    onChange={(e) => setMetalType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-white"
                    disabled={loading}
                  >
                    <option value="">Select Metal Type</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Select the metal type for this category
                  </p>
                </div>
              )}

              {/* Image Upload - Only for Parent Categories */}
              {isParentCategory && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Image
                  </label>
                  
                  {/* Show uploaded image */}
                  {imageUrl && (
                    <div className="mb-3 relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
                      <Image
                        src={imageUrl}
                        alt="Category"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* File input and upload button */}
                  {!imageUrl && (
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                        disabled={loading || uploadingImage}
                      />
                      {imageFile && (
                        <button
                          type="button"
                          onClick={handleUploadImage}
                          disabled={uploadingImage}
                          className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                          {uploadingImage ? (
                            <>
                              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <span>Upload Image</span>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                  
                  <p className="mt-1 text-xs text-gray-500">
                    Upload an image for this category (optional)
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50 rounded-b-lg sticky bottom-0">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !name.trim() || (isParentCategory && !metalType)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>{mode === 'create' ? 'Creating...' : 'Updating...'}</span>
                  </>
                ) : (
                  <span>{mode === 'create' ? `Create ${label}` : `Update ${label}`}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
