const express = require('express');
const djController = require('../controllers/djController');

const router = express.Router();

router.get('/featured', djController.getFeaturedDJs);

router.get('/:id', djController.getDJById);

module.exports = router;