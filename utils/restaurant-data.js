const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');
const getStoredRestaurants = () => {
  const filedata = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(filedata);
  return storedRestaurants;
};

const storedRestaurants = (restaurants) => {
  fs.writeFileSync(filePath, JSON.stringify(restaurants));
};

module.exports = {
  getStoredRestaurants,
  storedRestaurants,
};
