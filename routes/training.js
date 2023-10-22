const express = require('express');
const router = express.Router();

// Import controllers
const trainingsController = require('../controllers/trainings');

// excepts array of request handlers
// callback inside .use will be executed on every request
router.get('/', trainingsController.getTrainings);

module.exports = router;