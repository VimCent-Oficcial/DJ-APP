const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Cliente', 'DJ']], // Solo permite 'Cliente' o 'DJ'
    },
  },
  foto_perfil: {
    type: DataTypes.STRING, // URL de la imagen de perfil
    defaultValue: 'https://via.placeholder.com/150', // Imagen por defecto
  },
  descripcion: {
    type: DataTypes.TEXT, // Descripción del perfil
  },
  telefono: {
    type: DataTypes.STRING, // Número de teléfono
  },
  direccion: {
    type: DataTypes.TEXT, // Dirección
  },
  verificado: {
    type: DataTypes.BOOLEAN, // Estado de verificación (solo para DJs)
    defaultValue: false,
  },
});

// Hash de la contraseña antes de guardar el usuario
Usuario.beforeCreate(async (usuario) => {
  const salt = await bcrypt.genSalt(10);
  usuario.contrasena = await bcrypt.hash(usuario.contrasena, salt);
});

module.exports = Usuario;
