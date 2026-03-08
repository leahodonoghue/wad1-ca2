'use strict';

import logger from "../utils/logger.js";
import TravelStore from "../models/travel-store.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "Travel Destination App Dashboard",
      destinations: TravelStore.getAllTravelDestinations()
    };

    logger.debug(viewData.destinations);
    
    response.render('dashboard', viewData);   
  },
};

export default dashboard;