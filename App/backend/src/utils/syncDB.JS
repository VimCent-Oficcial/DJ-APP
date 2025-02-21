const sequelize = require('../config/db');
const Usuario = require('../models/Usuario');

const syncDB = async () => {
  try {
    await sequelize.sync({ force: true }); // Sincroniza los modelos con la base de datos
    console.log('Base de datos sincronizada');
  } catch (error) {
    console.error('Error sincronizando la base de datos:', error);
  }
};

syncDB();