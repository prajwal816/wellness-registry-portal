// API Configuration
const getApiBaseUrl = () => {
  // Force production URL if in production environment
  if (import.meta.env.PROD || import.meta.env.VITE_NODE_ENV === 'production') {
    return 'https://ayushwellness-backend.onrender.com';
  }
  
  // Use environment variable or fallback to localhost for development
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

const API_BASE_URL = getApiBaseUrl();

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

// Environment utilities
export const isDevelopment = import.meta.env.VITE_NODE_ENV === 'development';
export const isProduction = import.meta.env.VITE_NODE_ENV === 'production';

// Debug information (always show in console for troubleshooting)
console.log('API Configuration:', {
  currentEnvironment: import.meta.env.VITE_NODE_ENV,
  isProd: import.meta.env.PROD,
  viteApiUrl: import.meta.env.VITE_API_URL,
  baseUrl: API_BASE_URL,
  isDevelopment,
  isProduction
});