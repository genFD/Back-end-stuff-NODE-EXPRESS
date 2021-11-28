const express = require('express');
const router = express.Router();
const restaurantData = require('../utils/restaurant-data');
const uuid = require('uuid');

// 4. set up couple of paths and handle the response

router.get('/confirm', (request, response) => {
  response.render('confirm');
});

router.get('/recommend', (request, response) => {
  response.render('recommend');
});

router.post('/recommend', (request, response) => {
  const restaurant = request.body;
  restaurant.id = uuid.v4();
  const restaurants = restaurantData.getStoredRestaurants();
  restaurants.push(restaurant);
  restaurantData.storedRestaurants(restaurants);
  response.redirect('/confirm');
});

router.get('/restaurants', (request, response) => {
  const restaurants = restaurantData.getStoredRestaurants();

  response.render('restaurants', {
    restaurantsnumber: restaurants.length,
    restaurants,
  });
});

router.get('/restaurants/:id', (request, response) => {
  const restaurantId = request.params.id;
  const restaurants = restaurantData.getStoredRestaurants();

  for (let restaurant of restaurants) {
    if (restaurant.id === restaurantId) {
      return response.render('restaurant-details', {
        restaurant,
      });
    }
  }
  response.status(404).render('404');
});

module.exports = router;
