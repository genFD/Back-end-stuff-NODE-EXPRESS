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
// 1. import filesystem, express library, path to build path
const fs = require('fs');
const express = require('express');
const uuid = require('uuid');
const path = require('path');
const { response } = require('express');

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

// 4. set up couple of paths and handle the response

app.get('/about', (request, response) => {
  // const aboutHtmlFile = path.join(__dirname, 'views', 'about.html');
  // response.sendFile(aboutHtmlFile);
  response.render('about');
});

app.get('/confirm', (request, response) => {
  // const confirmHtmlFile = path.join(__dirname, 'views', 'confirm.html');
  // response.sendFile(confirmHtmlFile);
  response.render('confirm');
});
app.get('/', (request, response) => {
  // const indexHtmlFile = path.join(__dirname, 'views', 'index.html');
  // response.sendFile(indexHtmlFile);
  response.render('index');
});

app.get('/recommend', (request, response) => {
  // const recommendHtmlFile = path.join(__dirname, 'views', 'recommend.html');
  // response.sendFile(recommendHtmlFile);
  response.render('recommend');
});

app.post('/recommend', (request, response) => {
  const restaurant = request.body;
  restaurant.id = uuid.v4();
  const filePath = path.join(__dirname, 'data', 'restaurants.json');
  const filedata = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(filedata);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  response.redirect('/confirm');
});

app.get('/restaurants', (request, response) => {
  // const restaurantsHtmlFile = path.join(__dirname, 'views', 'restaurants.html');
  // response.sendFile(restaurantsHtmlFile);
  const filePath = path.join(__dirname, 'data', 'restaurants.json');
  const filedata = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(filedata);
  response.render('restaurants', {
    restaurantsnumber: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get('/restaurants/:id', (request, response) => {
  const restaurantId = request.params.id;

  const filePath = path.join(__dirname, 'data', 'restaurants.json');
  const filedata = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(filedata);
  for (let restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return response.render('restaurant-details', {
        restaurant,
      });
    }
  }
  response.render('404');
});
app.use((request, response) => {
  response.render('404');
});
app.use((error, request, response, next) => {
  response.render('500');
});
// 5. listen to a port i.e incoming network traffic
app.listen(3008);
