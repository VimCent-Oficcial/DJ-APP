// src/pages/LoginPage.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const HomePage = () => {
  const [djs, setDJs] = useState([]);

  useEffect(() => {
    const fetchDJs = async () => {
      try {
        const response = await api.get('/api/djs/featured');
        setDJs(response.data);
      } catch (error) {
        console.error('Error obteniendo DJs:', error);
      }
    };

    fetchDJs();
  }, []);

  return (
    <div>
      <h1>DJs Destacados</h1>
      <div>
        {djs.map((dj) => (
          <div key={dj.id}>
            <h2>{dj.nombre}</h2>
            <p>{dj.descripcion}</p>
            <img src={dj.foto_perfil} alt={dj.nombre} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;