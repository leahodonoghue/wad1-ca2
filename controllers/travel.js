'use strict';

import logger from '../utils/logger.js';
import TravelStore from '../models/travel-store.js';
import { v4 as uuidv4 } from 'uuid';

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

        /* this is an express function that renders the view */
        response.render('travel', viewData);
    },

           addCity(request, response) {
    const countryId = request.params.id;
    const country = TravelStore.getDestination(countryId);
    const newCity = {
      id: uuidv4(),
      city: request.body.city,
      type: request.body.type,
      popular: request.body.popular,
    };
    TravelStore.addCity(countryId, newCity);
    response.redirect('/travel/' + countryId);
},
};

export default travel;