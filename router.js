const express = require('express')
const router = express.Router()
const exerciseController = require('./controllers/exerciseController')

router.get('/', exerciseController.home) 

module.exports = router