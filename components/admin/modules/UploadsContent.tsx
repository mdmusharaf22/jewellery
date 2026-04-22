'use client';

import { useState, useRef, useCallback } from 'react';
import Toast from '@/components/admin/Toast';
import { uploadImage, removeImage, UploadResponse } from '@/lib/services/uploadService';

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: string;
}

export default function UploadsContent() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [removeUrl, setRemoveUrl] = useState('');
  const [removing, setRemoving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: 'success' | 'error') =>
    setToast({ message, type });

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const file = files[0];

    if (!allowed.includes(file.type)) {
      showToast('Only JPEG, PNG, WebP, and GIF images are allowed', 'error');
      return;
    }

    setUploading(true);
    try {
      const result: UploadResponse = await uploadImage(file);
      const url = result.url || result.image_url || result.file_url || '';
      if (!url) throw new Error('No URL returned from server');

      setImages((prev) => [
        {
          id: crypto.randomUUID(),
          url,
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
        },
        ...prev,
      ]);
      showToast('Image uploaded successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveFromList = async (image: UploadedImage) => {
    setRemoving(true);
    try {
      await removeImage(image.url);
      setImages((prev) => prev.filter((img) => img.id !== image.id));
      showToast('Image removed successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Remove failed', 'error');
    } finally {
      setRemoving(false);
    }
  };

  const handleRemoveByUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!removeUrl.trim()) return;
    setRemoving(true);
    try {
      await removeImage(removeUrl.trim());
      // Also remove from local list if present
      setImages((prev) => prev.filter((img) => img.url !== removeUrl.trim()));
      setRemoveUrl('');
      showToast('Image removed successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Remove failed', 'error');
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Image</h3>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition ${
            dragOver
              ? 'border-amber-500 bg-amber-50'
              : 'border-gray-300 hover:border-amber-400 hover:bg-gray-50'
          } ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500" />
              <p className="text-sm text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Drag & drop an image here, or <span className="text-amber-500">browse</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">JPEG, PNG, WebP, GIF supported</p>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Remove by URL Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Remove Image by URL</h3>
        <form onSubmit={handleRemoveByUrl} className="flex items-center space-x-3">
          <input
            type="url"
            value={removeUrl}
            onChange={(e) => setRemoveUrl(e.target.value)}
            placeholder="https://..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            disabled={removing}
          />
          <button
            type="submit"
            disabled={removing || !removeUrl.trim()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {removing ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Removing...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Remove</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Uploaded Images in this session */}
      {images.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Uploaded this session
            <span className="ml-2 text-sm font-normal text-gray-500">({images.length})</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image) => (
              <div key={image.id} className="group relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-32 object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                  <button
                    onClick={() => handleRemoveFromList(image)}
                    disabled={removing}
                    className="opacity-0 group-hover:opacity-100 transition bg-red-600 hover:bg-red-700 text-white rounded-full p-2 disabled:opacity-50"
                    title="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                {/* Info */}
                <div className="p-2">
                  <p className="text-xs text-gray-700 truncate font-medium">{image.name}</p>
                  <p className="text-xs text-gray-400">{image.size}</p>
                </div>
                {/* Copy URL */}
                <button
                  onClick={() => { navigator.clipboard.writeText(image.url); showToast('URL copied!', 'success'); }}
                  className="w-full text-xs text-amber-600 hover:text-amber-700 py-1 border-t border-gray-200 transition"
                >
                  Copy URL
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
