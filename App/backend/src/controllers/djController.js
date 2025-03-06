const Usuario = require('../models/Usuario');

const djController = {
  getFeaturedDJs: async (req, res) => {
    try {
      const djs = await Usuario.findAll({ where: { tipo_usuario: 'DJ' }, limit: 10 }); // Obtén los primeros 10 DJs
      res.status(200).json(djs);
    } catch (error) {
      res.status(500).json({ message: 'Error obteniendo DJs', error: error.message });
    }
  },
  getDJById: async (req, res) => {
    try {
      const dj = await Usuario.findByPk(req.params.id);
      if (!dj || dj.tipo_usuario !== 'DJ') {
        return res.status(404).json({ message: 'DJ no encontrado' });
      }
      res.status(200).json(dj);
    } catch (error) {
      res.status(500).json({ message: 'Error obteniendo DJ', error: error.message });
    }
  },
};

module.exports = djController;