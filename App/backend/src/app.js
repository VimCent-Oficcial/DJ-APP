const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes); // Agrega las rutas de autenticación

app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

module.exports = app;