const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

// excepts array of request handlers
// callback inside .use will be executed on every request
// next - function serves to allow the request transfer to another middleware
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'public/views', 'training.html'));
})

module.exports = router;