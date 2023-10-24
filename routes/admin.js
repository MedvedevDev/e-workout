const express = require('express');
const router = express.Router();

// Import controllers
const adminController = require('../controllers/admin');

// GET /admin/add-training
router.get('/add-workout', adminController.getAddWorkout);

// GET /admin/workouts
router.get('/workouts', adminController.getWorkouts);

// POST /admin/add-training
router.post('/add-workout', adminController.postNewWorkout);


module.exports = router;