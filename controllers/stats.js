"use strict";     
import logger from "../utils/logger.js";
import TravelStore from "../models/travel-store.js";
import accounts from './accounts.js';
import userStore from "../models/user-store.js";

const stats = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    
    if (loggedInUser) {
    logger.info("Stats page loading!");
    // app statistics calculations
    const users = userStore.getAllUsers();

    const countries = TravelStore.getAllTravelDestinations();

    let numUsers = users.length;

    let numCountries = countries.length;
    
    let numCities = countries.reduce((total, country) => total + country.destinations.length, 0);
	
	  let average = numCountries > 0 ? (numCities / numCountries).toFixed(2) : 0;


let cities = countries.flatMap(country => country.destinations);

let mapped = cities.map(city => city.rating);
let maxRating = Math.max(...mapped);
let maxRated = cities.filter(city => city.rating === maxRating);
let favCities = maxRated.map(item => item.city);

    const statistics = {
      displayNumCountries: numCountries,
      displayNumCities: numCities,
	    displayAverage: average,
        highest: maxRating,
        displayFav: favCities,
        displayNumUsers: numUsers
    };

    const viewData = {
      title: "Travel App Statistics",
      stats: statistics,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture
    };
  
    response.render("stats", viewData);
    }
    else response.redirect('/')

  },


};

export default stats;
