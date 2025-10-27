import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  verify: () => api.get('/auth/verify'),
};

export const dosenAPI = {
  getAll: () => api.get('/dosen'),
  getById: (id) => api.get(`/dosen/${id}`),
  create: (formData) => api.post('/dosen', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/dosen/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/dosen/${id}`),
};

export const asistenAPI = {
  getAll: () => api.get('/asisten'),
  getById: (id) => api.get(`/asisten/${id}`),
  create: (formData) => api.post('/asisten', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/asisten/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/asisten/${id}`),
};

export const pengurusAPI = {
  getAll: () => api.get('/pengurus'),
  getById: (id) => api.get(`/pengurus/${id}`),
  create: (formData) => api.post('/pengurus', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/pengurus/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/pengurus/${id}`),
};

export const jadwalAPI = {
  getAll: (type) => api.get('/jadwal', { params: { type } }),
  getById: (id) => api.get(`/jadwal/${id}`),
  getUpcomingSeminars: () => api.get('/jadwal/upcoming/seminars'),
  create: (data) => api.post('/jadwal', data),
  update: (id, data) => api.put(`/jadwal/${id}`, data),
  delete: (id) => api.delete(`/jadwal/${id}`),
};

export const pengajuanAPI = {
  getAll: (jenis) => api.get('/pengajuan', { params: { jenis } }),
  getById: (id) => api.get(`/pengajuan/${id}`),
  create: (data) => api.post('/pengajuan', data),
  update: (id, data) => api.put(`/pengajuan/${id}`, data),
  delete: (id) => api.delete(`/pengajuan/${id}`),
};

export const praktikumDetailAPI = {
  getAll: (params) => api.get('/praktikum-detail', { params }),
  getById: (id) => api.get(`/praktikum-detail/${id}`),
  getYears: () => api.get('/praktikum-detail/years'),
  create: (formData) => api.post('/praktikum-detail', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/praktikum-detail/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/praktikum-detail/${id}`),
};

export const galleryAPI = {
  getAll: (category) => api.get('/gallery', { params: { category } }),
  getById: (id) => api.get(`/gallery/${id}`),
  create: (formData) => api.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/gallery/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/gallery/${id}`),
};
