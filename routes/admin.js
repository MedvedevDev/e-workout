const express = require('express');
const router = express.Router();

// GET /admin/add-training
router.get('/add-training', (req, res, next) => {
    console.log('Add training middleware');
    res.send(`<form action="/add-training" method="POST"><input type="text" name="title"><button type="submit">Add training</button></form>`)
})

// POST /admin/add-training
router.post('/add-training', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;