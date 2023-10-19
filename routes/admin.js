const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

// GET /admin/add-training
router.get('/add-training', (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../', 'dev-data/views', 'add-training.html'));
    res.sendFile(path.join(rootDir, 'dev-data/views', 'add-training.html')); // Second argument is removed, _dirname is replaced
})

// POST /admin/add-training
router.post('/add-training', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;