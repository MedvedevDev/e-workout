const express = require('express');
const path = require('path');
const adminData = require('./admin');

const router = express.Router();

// excepts array of request handlers
// callback inside .use will be executed on every request
router.get('/', (req, res, next) => {
    console.log(adminData.trainings)
    //res.sendFile(path.join(rootDir, 'public/views', 'training.html')); --- html is replaced with pug

    const trainings = adminData.trainings;

    // render() method uses default templating engine that we provided via app.set()
    res.render('training', { trainings, docTitle: 'Trainings' });
})

module.exports = router;