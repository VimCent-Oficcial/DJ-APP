import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './actions/profileActions';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import DJProfilePage from './pages/DJProfilePage';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Obtener el perfil del usuario al cargar la aplicación
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/dj/:id" element={<DJProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;