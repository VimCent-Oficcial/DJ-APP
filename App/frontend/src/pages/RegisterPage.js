// RegisterPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/authActions';

const RegisterPage = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo_usuario, setTipoUsuario] = useState('Cliente');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(nombre, email, password, tipo_usuario));
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <select value={tipo_usuario} onChange={(e) => setTipoUsuario(e.target.value)}>
          <option value="Cliente">Cliente</option>
          <option value="DJ">DJ</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;