'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const start = {
  createView(request, response) {
    logger.info("Start page loading!");

  /* this creates a new object called “viewData” in the function createView()
   This function has all the data to be sent to the view */
    const viewData = {
      title: "Welcome to the Travel Destination App",
      info: appStore.getAppInfo()
    };
    
    response.render('start', viewData);   
  },
};

export default start;
