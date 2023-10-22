const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

const trainings = [];

// GET /admin/add-training
router.get('/add-training', (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../', 'public/views', 'add-training.html'));
    //res.sendFile(path.join(rootDir, 'public/views', 'add-training.html')); // Second argument is removed, _dirname is replaced

    res.render('add-training', { docTitle: 'Add Product', path: '/admin/add-training' });
})

// POST /admin/add-training
router.post('/add-training', (req, res, next) => {
    trainings.push({ exerciseTitle: req.body.title })
    res.redirect('/');
})

exports.routes = router;
exports.trainings = trainings;