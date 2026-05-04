'use strict';

import logger from "../utils/logger.js";
import TravelStore from "../models/travel-store.js";
import { v4 as uuidv4 } from 'uuid';

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    const searchTerm = request.query.searchTerm || "";
    
    const destinations = searchTerm
      ? TravelStore.searchCountries(searchTerm)
      : TravelStore.getAllTravelDestinations();

  /* this creates a new object called “viewData” in the function createView()
   This function has all the data to be sent to the view */
    const viewData = {
      title: "Travel Destination App Dashboard",
      destinations: destinations,
      search: searchTerm
    };

    logger.debug(viewData.destinations);
    
    response.render('dashboard', viewData);   
  },

  addCountry(request, response) {
    const timestamp = new Date();
    const newCountry = {
      id: uuidv4(),
      country: request.body.country,
      date: timestamp,
      destinations: [],
    };
    TravelStore.addCountry(newCountry);
    response.redirect('/dashboard');
},

deleteCountry(request, response) {
    const countryId = request.params.id;
    logger.debug(`Deleting Country ${countryId}`);
    TravelStore.removeCountry(countryId);
    response.redirect("/dashboard");
},


};

export default dashboard;