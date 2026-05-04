"use strict";     
import logger from "../utils/logger.js";
import TravelStore from "../models/travel-store.js";

const stats = {
  createView(request, response) {
    logger.info("Stats page loading!");
    // app statistics calculations
    const countries = TravelStore.getAllTravelDestinations();

    let numCountries = countries.length;
    
    let numCities = countries.reduce((total, country) => total + country.destinations.length, 0);
	
	  let average = numCountries > 0 ? (numCities / numCountries).toFixed(2) : 0;

// let cities was researched
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
        displayFav: favCities
    }

    const viewData = {
      title: "Travel App Statistics",
      stats: statistics
    };
  
    response.render("stats", viewData);


  },


};

export default stats;
