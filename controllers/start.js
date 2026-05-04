'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from './accounts.js';
import TravelStore from "../models/travel-store.js";
import userStore from "../models/user-store.js";

const start = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Start page loading!");

  /* this creates a new object called “viewData” in the function createView()
   This function has all the data to be sent to the view */
   if (loggedInUser) {
    const viewData = {
      title: "Welcome to the Travel Destination App",
      info: appStore.getAppInfo(),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
      totalUsers: userStore.getAllUsers().length,
    };
    
    response.render('start', viewData);   
  }
  else response.redirect('/');
},
}

export default start;
