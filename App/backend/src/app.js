const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const djRoutes = require('./routes/djRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/upload', uploadRoutes); // Rutas para subir archivos
app.use('/api/djs', djRoutes); // Rutas para DJs
app.use('/api/profile', profileRoutes); // Rutas para perfiles

app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

module.exports = app;