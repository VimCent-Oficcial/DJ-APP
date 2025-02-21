const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Tipo_Usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Cliente', 'DJ']], // Solo permite 'Cliente' o 'DJ'
    },
  },
});

module.exports = Usuario;