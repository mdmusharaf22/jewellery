// Upload Service - API calls for image upload/remove

import { getAccessToken } from '../auth';
import { handleUnauthorized } from '../api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface UploadResponse {
  url: string;
  key?: string;
  [key: string]: any;
}

// Upload image — multipart/form-data with field name "file"
export const uploadImage = async (file: File): Promise<UploadResponse> => {
  const token = getAccessToken();
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/uploads/image`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (response.status === 401) {
    handleUnauthorized();
    throw new Error('Session expired. Please login again.');
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Upload failed');
  return data.data ?? data;
};

// Remove image by URL or key
export const removeImage = async (url: string): Promise<void> => {
  const token = getAccessToken();

  const response = await fetch(`${API_BASE_URL}/uploads/remove`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ url }),
  });

  if (response.status === 401) {
    handleUnauthorized();
    throw new Error('Session expired. Please login again.');
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Remove failed');
};
