const express = require('express');
const router = express.Router();

// Import controllers
const mainController = require('../controllers/main');

// excepts array of request handlers
// callback inside .use will be executed on every request
router.get('/', mainController.getIndex);

router.get('/workouts', mainController.getWorkouts);

module.exports = router;