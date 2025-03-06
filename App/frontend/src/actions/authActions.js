import api from '../services/api';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('token', response.data.token); // Guardar el token en el localStorage
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
  }
};

export const register = (nombre, email, password, tipo_usuario) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });
  try {
    const response = await api.post('/api/auth/register', { nombre, email, contrasena: password, tipo_usuario });
    localStorage.setItem('token', response.data.token); // Guardar el token en el localStorage
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token'); // Eliminar el token del localStorage
  dispatch({ type: 'LOGOUT' });
};