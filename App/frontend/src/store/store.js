import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers'; // La ruta ahora es válida

export const store = configureStore({
  reducer: rootReducer,
});