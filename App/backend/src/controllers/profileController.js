const Usuario = require('../models/Usuario');

const profileController = {
  getProfile: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.user.id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: 'Error obteniendo perfil', error: error.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { nombre, descripcion, telefono, direccion, foto_perfil } = req.body;
      const usuario = await Usuario.findByPk(req.user.id);

      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      usuario.nombre = nombre || usuario.nombre;
      usuario.descripcion = descripcion || usuario.descripcion;
      usuario.telefono = telefono || usuario.telefono;
      usuario.direccion = direccion || usuario.direccion;
      usuario.foto_perfil = foto_perfil || usuario.foto_perfil;

      await usuario.save();
      res.status(200).json({ message: 'Perfil actualizado', usuario });
    } catch (error) {
      res.status(500).json({ message: 'Error actualizando perfil', error: error.message });
    }
  },

  verifyDJ: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.user.id);

      if (!usuario || usuario.tipo_usuario !== 'DJ') {
        return res.status(400).json({ message: 'Solo los DJs pueden verificarse' });
      }

      usuario.verificado = true;
      await usuario.save();
      res.status(200).json({ message: 'DJ verificado', usuario });
    } catch (error) {
      res.status(500).json({ message: 'Error verificando DJ', error: error.message });
    }
  },
};

module.exports = profileController;