const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

// Import routes
const adminRoutes = require('./routes/admin');
const trainingRoutes = require('./routes/training');

const app = express();

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));

// Outsourced routes
//app.use(adminRoutes);
app.use('/admin', adminRoutes);
app.use(trainingRoutes);

// app.use('/', (req, res, next) => {
//     console.log('Main middleware');
//     next();
// })
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'dev-data/views', '404.html'));
})

//const server = http.createServer(app);

app.listen(3000);


