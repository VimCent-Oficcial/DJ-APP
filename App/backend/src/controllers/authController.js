const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const dotenv = require('dotenv');

dotenv.config();

const authController = {
  // Método para registrar un nuevo usuario
  register: async (req, res) => {
    try {
      const { nombre, email, contrasena, tipo_usuario } = req.body;

      // Verificar si el usuario ya existe
      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ msg: 'El email ya está registrado' });
      }

      // Crear el nuevo usuario (el hash se hace automáticamente en el modelo)
      const nuevoUsuario = await Usuario.create({
        nombre,
        email,
        contrasena, // El hook `beforeCreate` en el modelo se encarga del hash
        tipo_usuario,
      });

      // Generar el token JWT
      const token = jwt.sign({ id: nuevoUsuario.id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // El token expira en 1 hora
      });

      // Devolver el token y los datos del usuario
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

  // Método para iniciar sesión
  login: async (req, res) => {
    try {
      const { email, contrasena } = req.body;

      // Verificar si el usuario existe
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(400).json({ msg: 'Usuario no encontrado' });
      }

      // Verificar que la contraseña proporcionada y la almacenada estén definidas
      if (!contrasena || !usuario.contrasena) {
        return res.status(400).json({ msg: 'Credenciales inválidas' });
      }

      // Depuración: Verificar los valores de la contraseña y el hash
      console.log('Email proporcionado:', email);
      console.log('Contraseña proporcionada:', contrasena);
      console.log('Hash almacenado:', usuario.contrasena);

      // Verificar la contraseña
      const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
      if (!contrasenaValida) {
        return res.status(401).json({ msg: 'Contraseña incorrecta' });
      }

      // Generar el token JWT
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, tipo_usuario: usuario.tipo_usuario },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // El token expira en 1 hora
      );

      // Devolver el token y los datos del usuario
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