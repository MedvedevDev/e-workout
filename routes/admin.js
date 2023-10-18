const express = require('express');
const router = express.Router();

router.get('/add-training', (req, res, next) => {
    console.log('Add training middleware');
    res.send(`<form action="/training" method="POST"><input type="text" name="title"><button type="submit">Add training</button></form>`)
})

router.post('/training', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;