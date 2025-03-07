const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Ruta protegida para obtener el perfil
router.get('/', authMiddleware, profileController.getProfile);

module.exports = router;