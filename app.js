const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

// Import routes
const adminRoutes = require('./routes/admin');
const trainingRoutes = require('./routes/training');

const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded());

// Routes
app.use(adminRoutes);
app.use(trainingRoutes);

// app.use('/', (req, res, next) => {
//     console.log('Main middleware');
//     next();
// })

const server = http.createServer(app);

server.listen(3000);


