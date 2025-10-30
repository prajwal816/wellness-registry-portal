import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  googleLogin: () => window.location.href = `${API_URL}/auth/google`
};

// Applications API
export const applicationsAPI = {
  getAll: () => api.get('/applications'),
  getUserApplications: () => api.get('/applications/my-applications'),
  getById: (id: string) => api.get(`/applications/${id}`),
  create: (applicationData: any) => api.post('/applications', applicationData),
  update: (id: string, applicationData: any) => api.put(`/applications/${id}`, applicationData),
  updateStatus: (id: string, statusData: any) => api.patch(`/applications/${id}/status`, statusData),
  delete: (id: string) => api.delete(`/applications/${id}`)
};

export default api;