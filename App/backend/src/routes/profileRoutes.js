const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Obtener perfil
router.get('/', authMiddleware, profileController.getProfile);

// Actualizar perfil
router.put('/', authMiddleware, profileController.updateProfile);

// Verificar DJ
router.post('/verify', authMiddleware, profileController.verifyDJ);

module.exports = router;