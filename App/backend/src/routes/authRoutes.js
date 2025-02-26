const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Ruta para el registro
router.post('/register', authController.register);

// Ruta para el login
router.post('/login', authController.login);

module.exports = router;