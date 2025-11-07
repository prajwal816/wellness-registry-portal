import axios from 'axios';
import { API_CONFIG } from '@/config/api';

const API_URL = API_CONFIG.BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: any) => api.post('/api/auth/register', userData),
  login: (credentials: any) => api.post('/api/auth/login', credentials),
  getCurrentUser: () => api.get('/api/auth/me'),
  googleLogin: () => window.location.href = `${API_URL}/api/auth/google`
};

// Applications API
export const applicationsAPI = {
  getAll: () => api.get('/api/applications'),
  getUserApplications: () => api.get('/api/applications/my-applications'),
  getById: (id: string) => api.get(`/api/applications/${id}`),
  create: (applicationData: any) => api.post('/api/applications', applicationData),
  update: (id: string, applicationData: any) => api.put(`/api/applications/${id}`, applicationData),
  updateStatus: (id: string, statusData: any) => api.patch(`/api/applications/${id}/status`, statusData),
  delete: (id: string) => api.delete(`/api/applications/${id}`)
};

export default api;