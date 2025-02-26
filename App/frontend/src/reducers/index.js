import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Aquí irán otros reducers
});

export default rootReducer;