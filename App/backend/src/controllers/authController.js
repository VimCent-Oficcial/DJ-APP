const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const dotenv = require('dotenv');

dotenv.config();

const authController = {
  register: async (req, res) => {
    try {
      const { nombre, email, contrasena, tipo_usuario } = req.body;

      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ msg: 'El email ya está registrado' });
      }

      const nuevoUsuario = await Usuario.create({
        nombre,
        email,
        contrasena,
        tipo_usuario,
      });

      const token = jwt.sign({ id: nuevoUsuario.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({
        msg: 'Usuario registrado exitosamente',
        token,
        user: {
          id: nuevoUsuario.id,
          nombre: nuevoUsuario.nombre,
          email: nuevoUsuario.email,
          tipo_usuario: nuevoUsuario.tipo_usuario,
        },
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ msg: 'Error en el servidor', error });
    }
  },

  login: async (req, res) => {
    try {
      const { email, contrasena } = req.body;

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(400).json({ msg: 'Usuario no encontrado' });
      }

      const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!contrasenaValida) {
        return res.status(401).json({ msg: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, tipo_usuario: usuario.tipo_usuario },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({
        msg: 'Inicio de sesión exitoso',
        token,
        user: {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          tipo_usuario: usuario.tipo_usuario,
        },
      });
    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ msg: 'Error en el servidor', error });
    }
  },
};

module.exports = authController;