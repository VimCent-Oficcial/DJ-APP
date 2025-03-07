import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';

const HomePage = () => {
  const [djs, setDJs] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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

  const handleAccountClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <h1>Bienvenido a Pandifymx</h1>
      <button onClick={handleAccountClick}>Cuenta</button>
      {user && <p>¡Hola, {user.nombre}!</p>}
      
      <h2>DJs Destacados</h2>
      <div>
        {djs.map((dj) => (
          <div key={dj.id}>
            <h3>{dj.nombre}</h3>
            <p>{dj.descripcion}</p>
            <img src={dj.foto_perfil} alt={dj.nombre} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;