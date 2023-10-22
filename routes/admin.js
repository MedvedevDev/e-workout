const express = require('express');
const path = require('path');

// Import controllers
const trainingsController = require('../controllers/trainings');

const router = express.Router();

// GET /admin/add-training
router.get('/add-training', trainingsController.getAddTraining);

// POST /admin/add-training
router.post('/add-training', trainingsController.postNewTraining);

module.exports = router;