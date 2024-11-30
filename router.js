const express = require('express')
const router = express.Router()
const exerciseController = require('./controllers/exerciseController')

router.get('/', exerciseController.home) 
router.get('/exercises', exerciseController.getAllExercises) 
router.get('/exercises/:id', exerciseController.getExercise) 
router.post('/exercises', exerciseController.createExercise)
router.delete('/exercises', exerciseController.deleteExercises)
router.delete('/exercises/:id', exerciseController.deleteOneExercise)
router.patch('/exercises/:id', exerciseController.updateExercise)

module.exports = router