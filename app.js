const express = require('express');
const path = require('path');

// Import routes
const adminRoutes = require('./routes/admin');
const mainRoutes = require('./routes/main');

// Import controllers
const errorController = require('./controllers/error')

const app = express();

// Set global configuration value
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // To serve files statically (to not handle html & css files by routers and etc)

// Outsourced routes
app.use('/admin', adminRoutes);
app.use(mainRoutes);

app.use(errorController.get404Page);

//const server = http.createServer(app);

app.listen(8000);


