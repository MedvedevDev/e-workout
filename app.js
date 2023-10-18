const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

// Import routes
const adminRoutes = require('./routes/admin');
const trainingRoutes = require('./routes/training');

const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded());

// Outsourced routes
//app.use(adminRoutes);
app.use('/admin', adminRoutes);
app.use(trainingRoutes);

// app.use('/', (req, res, next) => {
//     console.log('Main middleware');
//     next();
// })
app.use((req, res, next) => {
    res.status(404).send(`<h1>Page not found</h1>`)
})

//const server = http.createServer(app);

app.listen(3000);


