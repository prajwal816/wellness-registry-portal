import axios from 'axios';
import { API_CONFIG, createApiUrl } from '@/config/api';

export interface UploadResponse {
  message: string;
  file: {
    url: string;
    publicId: string;
    originalName: string;
    size: number;
    format: string;
  };
}

export interface MultipleUploadResponse {
  message: string;
  files: Array<{
    url: string;
    publicId: string;
    originalName: string;
    size: number;
    format: string;
  }>;
}

// Upload single file
export const uploadFile = async (file: File, token?: string): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token && { 'x-auth-token': token })
    }
  };

  const response = await axios.post(createApiUrl(API_CONFIG.ENDPOINTS.UPLOAD.SINGLE), formData, config);
  return response.data;
};

// Upload multiple files
export const uploadMultipleFiles = async (files: File[], token?: string): Promise<MultipleUploadResponse> => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token && { 'x-auth-token': token })
    }
  };

  const response = await axios.post(createApiUrl(API_CONFIG.ENDPOINTS.UPLOAD.MULTIPLE), formData, config);
  return response.data;
};

// Upload user avatar
export const uploadAvatar = async (file: File, token: string): Promise<{ message: string; avatar: { url: string; publicId: string } }> => {
  const formData = new FormData();
  formData.append('avatar', file);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': token
    }
  };

  const response = await axios.post(createApiUrl(API_CONFIG.ENDPOINTS.AUTH.AVATAR), formData, config);
  return response.data;
};

// Delete file
export const deleteFile = async (publicId: string, token?: string): Promise<{ message: string }> => {
  const config = {
    headers: {
      ...(token && { 'x-auth-token': token })
    }
  };

  const response = await axios.delete(`${createApiUrl(API_CONFIG.ENDPOINTS.UPLOAD.DELETE)}/${publicId}`, config);
  return response.data;
};

// Get file info
export const getFileInfo = async (publicId: string, token?: string) => {
  const config = {
    headers: {
      ...(token && { 'x-auth-token': token })
    }
  };

  const response = await axios.get(`${createApiUrl(API_CONFIG.ENDPOINTS.UPLOAD.INFO)}/${publicId}`, config);
  return response.data;
};

// Utility function to validate file type
export const validateFileType = (file: File, allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']): boolean => {
  return allowedTypes.includes(file.type);
};

// Utility function to validate file size (in MB)
export const validateFileSize = (file: File, maxSizeMB: number = 10): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

// Utility function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};