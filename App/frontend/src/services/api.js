// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/', // Reemplaza con la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores para manejar errores globales o añadir tokens de autenticación
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Manejar el error de autenticación (por ejemplo, redirigir al login)
    }
    return Promise.reject(error);
  }
);

export default api;