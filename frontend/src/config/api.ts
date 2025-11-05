// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      GOOGLE: '/api/auth/google',
      GOOGLE_CALLBACK: '/api/auth/google/callback',
      ME: '/api/auth/me',
      AVATAR: '/api/auth/avatar'
    },
    UPLOAD: {
      SINGLE: '/api/upload/single',
      MULTIPLE: '/api/upload/multiple',
      DELETE: '/api/upload',
      INFO: '/api/upload/info'
    },
    APPLICATIONS: '/api/applications'
  }
};

// Create full URL
export const createApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Environment check
export const isDevelopment = import.meta.env.VITE_NODE_ENV === 'development';
export const isProduction = import.meta.env.VITE_NODE_ENV === 'production';