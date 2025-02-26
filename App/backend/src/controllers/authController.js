const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const dotenv = require('dotenv');

dotenv.config();

const authController = {
  // Registro de usuario
  register: async (req, res) => {
    try {
      const { nombre, email, contrasena, tipo_usuario } = req.body;

      // Verificar si el usuario ya existe
      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      // Crear el usuario
      const nuevoUsuario = await Usuario.create({
        nombre,
        email,
        contrasena: hashedPassword,
        tipo_usuario,
      });

      res.status(201).json({ message: 'Usuario registrado', usuario: nuevoUsuario });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Login de usuario
  login: async (req, res) => {
    try {
      const { email, contrasena } = req.body;

      // Verificar si el usuario existe
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }

      // Verificar la contraseña
      const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!contrasenaValida) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }

      // Generar un token JWT
      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // El token expira en 1 hora
      });

      res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },
};

module.exports = authController;