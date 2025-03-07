import api from '../services/api';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_REQUEST' });
  try {
    const response = await api.post('/api/auth/login', { email, password });

    // Guardar el token y el usuario en localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response?.data?.message || 'Error en el login' });
    throw error;
  }
};

export const register = (nombre, email, password, tipo_usuario) => async (dispatch) => {
  dispatch({ type: 'REGISTER_REQUEST' });
  try {
    const response = await api.post('/api/auth/register', { nombre, email, contrasena: password, tipo_usuario });

    // Guardar el token y el usuario en localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'REGISTER_FAILURE', payload: error.response?.data?.message || 'Error en el registro' });
    throw error;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch({ type: 'LOGOUT' });
};