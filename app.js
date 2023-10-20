const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./util/path');

// Import routes
const adminData = require('./routes/admin');
const trainingRoutes = require('./routes/training');

const app = express();

// Set global configuration value
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // To serve files statically (to not handle html & css files by routers and etc)

// Outsourced routes
// app.use(adminData);
app.use('/admin', adminData.routes);
app.use(trainingRoutes);

app.use((req, res, next) => {
        //res.status(404).sendFile(path.join(rootDir, 'public/views', '404.html'));
        res.status(404).render('404', { docTitle: 'Not found' });
})

//const server = http.createServer(app);

app.listen(3000);


