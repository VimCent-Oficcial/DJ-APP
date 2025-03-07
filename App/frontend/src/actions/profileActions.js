import api from '../services/api';

export const getProfile = () => async (dispatch) => {
    dispatch({ type: 'PROFILE_REQUEST' });
    try {
      const response = await api.get('/api/profile'); // Solicitud protegida
      dispatch({ type: 'PROFILE_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'PROFILE_FAILURE', payload: error.response?.data?.message || 'Error obteniendo perfil' });
      throw error;
    }
};

export const updateProfile = (profileData) => async (dispatch) => {
  dispatch({ type: 'PROFILE_REQUEST' });
  try {
    const response = await api.put('/api/profile', profileData);
    localStorage.setItem('user', JSON.stringify(response.data)); // Actualizar el usuario en localStorage
    dispatch({ type: 'UPDATE_PROFILE', payload: response.data });
  } catch (error) {
    dispatch({ type: 'PROFILE_FAILURE', payload: error.response?.data?.message || 'Error actualizando perfil' });
  }
};

export const verifyDJ = () => async (dispatch) => {
  dispatch({ type: 'PROFILE_REQUEST' });
  try {
    const response = await api.post('/api/profile/verify');
    localStorage.setItem('user', JSON.stringify(response.data)); // Actualizar el usuario en localStorage
    dispatch({ type: 'UPDATE_PROFILE', payload: response.data });
  } catch (error) {
    dispatch({ type: 'PROFILE_FAILURE', payload: error.response?.data?.message || 'Error verificando DJ' });
  }
};