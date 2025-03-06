const express = require('express');
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/upload'); // Middleware para manejar archivos

const router = express.Router();

router.post('/upload', upload.single('image'), uploadController.uploadImage);

module.exports = router;