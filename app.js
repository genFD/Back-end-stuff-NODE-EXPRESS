/*
============
GOALS
============
*/

// 1- create an express server i.e node js server with help of express js library

// 2- set up a couple of routes i.e paths

// 3- send back different responses based on the user input

/*
=========================================
*/
// 1. import filesystem, express library, path to build path,restaurantdata
const fs = require('fs');
const express = require('express');
const path = require('path');
const defaultRoutes = require('./routes/default');
const restaurantsRoutes = require('./routes/restaurants');

// 2. invoke express
const app = express();

// for jsengine Template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 3. register middleware to load css and js i.e static files
// a-register middleware to load css and js i.e static files
app.use(express.static('public'));

// b-register middleware to populate incoming data
app.use(
  express.urlencoded({
    extended: false,
  })
);

// 4. set up couple of paths and handle the response (check routes)
app.use('/', defaultRoutes);
app.use('/', restaurantsRoutes);

app.use((request, response) => {
  response.status(404).render('404');
});
app.use((error, request, response, next) => {
  response.status(500).render('500');
});

// 5. listen to a port i.e incoming network traffic
app.listen(3008);
