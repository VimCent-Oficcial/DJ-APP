import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // URL del backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agrega el token al encabezado
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); // Elimina el token inválido
      localStorage.removeItem('user'); // Elimina el usuario
      window.location.href = '/login'; // Redirige al login
    }
    return Promise.reject(error);
  }
);

export default api;