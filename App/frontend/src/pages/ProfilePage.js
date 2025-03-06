import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile, verifyDJ } from '../actions/profileActions';
import { logout } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [foto_perfil, setFotoPerfil] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setNombre(user.nombre);
      setDescripcion(user.descripcion);
      setTelefono(user.telefono);
      setDireccion(user.direccion);
      setFotoPerfil(user.foto_perfil);
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ nombre, descripcion, telefono, direccion, foto_perfil }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1>Perfil</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        <input type="text" placeholder="URL de la foto de perfil" value={foto_perfil} onChange={(e) => setFotoPerfil(e.target.value)} />
        <button type="submit">Actualizar Perfil</button>
      </form>
      {user?.tipo_usuario === 'DJ' && (
        <button onClick={() => dispatch(verifyDJ())}>
          {user.verificado ? 'Verificado' : 'Verificar DJ'}
        </button>
      )}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default ProfilePage;