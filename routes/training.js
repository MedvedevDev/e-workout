const express = require('express');
const router = express.Router();

// excepts array of request handlers
// callback inside .use will be executed on every request
// next - function serves to allow the request transfer to another middleware
router.get('/', (req, res, next) => {
    res.send('Main middleware');
})

module.exports = router;