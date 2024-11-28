const express = require('express')
const router = express.Router()
const exerciseController = require('./controllers/exerciseController')

router.get('/', exerciseController.home) 
router.post('/exercises', exerciseController.createExercise)

module.exports = router