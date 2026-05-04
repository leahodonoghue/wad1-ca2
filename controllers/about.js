'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import empStore from "../models/emp-store.js";
import accounts from './accounts.js';

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");
    
/* this creates a new object called “viewData” in the function createView()
   This function has all the data to be sent to the view */
   if (loggedInUser) {
    const viewData = {
      title: "About the Travel Destination App",
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
      info: appStore.getAppInfo(),
      emps: empStore.getEmpInfo()
    };
    logger.info(viewData.emps)
    response.render('about', viewData);   
  }
  else response.redirect('/');
},
}
export default about;