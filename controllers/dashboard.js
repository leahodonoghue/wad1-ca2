'use strict';

import logger from "../utils/logger.js";
import TravelStore from "../models/travel-store.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
  /* this creates a new object called “viewData” in the function createView()
   This function has all the data to be sent to the view */
    const viewData = {
      title: "Travel Destination App Dashboard",
      destinations: TravelStore.getAllTravelDestinations()
    };

    logger.debug(viewData.destinations);
    
    response.render('dashboard', viewData);   
  },
};

export default dashboard;