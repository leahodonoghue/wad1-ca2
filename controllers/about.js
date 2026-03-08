'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import empStore from "../models/emp-store.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!");
    
    const viewData = {
      title: "About the Travel Destination App",
      info: appStore.getAppInfo(),
      emps: empStore.getEmpInfo()
    };
    logger.info(viewData.emps)
    response.render('about', viewData);   
  },
};

export default about;