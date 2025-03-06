import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const DJProfilePage = () => {
  const { id } = useParams();
  const [dj, setDJ] = useState(null);

  useEffect(() => {
    const fetchDJ = async () => {
      try {
        const response = await api.get(`/api/djs/${id}`);
        setDJ(response.data);
      } catch (error) {
        console.error('Error obteniendo DJ:', error);
      }
    };

    fetchDJ();
  }, [id]);

  if (!dj) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{dj.nombre}</h1>
      <img src={dj.foto_perfil} alt={dj.nombre} />
      <p>{dj.descripcion}</p>
      <button disabled={!localStorage.getItem('token')}>Enviar Mensaje</button>
      <button disabled={!localStorage.getItem('token')}>Contratar</button>
    </div>
  );
};

export default DJProfilePage;