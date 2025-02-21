import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';


// Selecciona el elemento root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza usando createRoot
root.render(
  <Provider store={store}>
    <App />
    <div>
      {/* Aquí irá el formulario de login */}
    </div>
  </Provider>
);
