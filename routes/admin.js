const express = require('express');
const router = express.Router();

// Import controllers
const adminController = require('../controllers/admin');

// GET /admin/add-training
router.get('/add-workout', adminController.getAddWorkout);

// GET /admin/workouts
router.get('/workouts', adminController.getWorkouts);

// POST /admin/add-workout
router.post('/add-workout', adminController.postNewWorkout);

// EDIT
router.get('/edit-workout/:workoutId', adminController.getEditWorkout);
router.post('/edit-workout', adminController.postEditWorkout);

// DELETE
router.post('/delete-workout', adminController.postDeleteWorkout);


module.exports = router;