import api from '../services/api';

export const getProfile = () => async (dispatch) => {
  dispatch({ type: 'PROFILE_REQUEST' });
  try {
    const response = await api.get('/api/profile');
    dispatch({ type: 'UPDATE_PROFILE', payload: response.data });
  } catch (error) {
    dispatch({ type: 'PROFILE_FAILURE', payload: error.response.data.message });
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  dispatch({ type: 'PROFILE_REQUEST' });
  try {
    const response = await api.put('/api/profile', profileData);
    dispatch({ type: 'UPDATE_PROFILE', payload: response.data });
  } catch (error) {
    dispatch({ type: 'PROFILE_FAILURE', payload: error.response.data.message });
  }
};

export const verifyDJ = () => async (dispatch) => {
  dispatch({ type: 'PROFILE_REQUEST' });
  try {
    const response = await api.post('/api/profile/verify');
    dispatch({ type: 'UPDATE_PROFILE', payload: response.data });
  } catch (error) {
    dispatch({ type: 'PROFILE_FAILURE', payload: error.response.data.message });
  }
};