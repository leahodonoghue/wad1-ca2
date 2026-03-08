'use strict';

import logger from '../utils/logger.js';
import TravelStore from '../models/travel-store.js';

const travel = {
    createView(request, response) {
       const destinationId = request.params.id;
       logger.debug(`Destination id = ${destinationId}`);

 /* this creates a new object called “viewData” in the function createView()
   This function has all the data to be sent to the view */
        const viewData = {
            title: 'Destination',
            singleDestination: TravelStore.getDestination(destinationId)
        };
        response.render('travel', viewData);
    },
};

export default travel;