'use strict';

import logger from "../utils/logger.js";
import TravelStore from "../models/travel-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';


const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

     const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
    const searchTerm = request.query.searchTerm || "";
    
    const destinations = searchTerm
      ? TravelStore.searchCountries(searchTerm, loggedInUser.id)
      : TravelStore.getUserCountries(loggedInUser.id);

    const sortField = request.query.sort;
    const order = request.query.order === "desc" ? -1 : 1;

    let sorted = destinations;

    if (sortField) {
      sorted = destinations.slice().sort((a, b) => {
        if (sortField === "country") {
          return a.country.localeCompare(b.country) * order;
        }


        return 0;
      });
    }

  /* this creates a new object called “viewData” in the function createView()
   This function has all the data to be sent to the view */
    const viewData = {
       title: "Travel App Dashboard",
       fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      destinations: sortField ? sorted : destinations,
      search: searchTerm,
      countrySelected: request.query.sort === "country",
      ascSelected: request.query.order === "asc",
      descSelected: request.query.order === "desc",
    };

    logger.debug(viewData.destinations);
    logger.info('about to render' + viewData.destinations);
    response.render('dashboard', viewData);   
  } 
  else response.redirect('/');
},

  addCountry(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(loggedInUser.id);
    const timestamp = new Date();

    const newCountry = {
      userid: loggedInUser.id,
      id: uuidv4(),
      country: request.body.country,
      date: timestamp,
      destinations: [],
    };
    TravelStore.addCountry(newCountry);
    response.redirect("/dashboard");
  

},

deleteCountry(request, response) {
    const countryId = request.params.id;
    logger.debug(`Deleting Country ${countryId}`);
    TravelStore.removeCountry(countryId);
    response.redirect("/dashboard");
},


};

export default dashboard;