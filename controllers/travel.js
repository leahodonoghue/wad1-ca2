'use strict';

import logger from '../utils/logger.js';
import TravelStore from '../models/travel-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const travel = {
    createView(request, response) {
       const destinationId = request.params.id;
       const loggedInUser = accounts.getCurrentUser(request);
       logger.debug(`Destination id = ${destinationId}`);

 /* this creates a new object called “viewData” in the function createView()
   This function has all the data to be sent to the view */
        const viewData = {
            title: 'Destination',
            singleDestination: TravelStore.getDestination(destinationId),
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
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
      rating: parseInt(request.body.rating)
    };
    TravelStore.addCity(countryId, newCity, request.files.picture, function() {
    response.redirect('/travel/' + countryId);
    }
);
},

deleteCity(request, response) {
    const countryId = request.params.id;
    const cityId = request.params.cityid;
    logger.debug(`Deleting City  ${cityId} from Country ${countryId}`);
    TravelStore.removeCity(countryId, cityId, function() {
        response.redirect('/travel/' + countryId);
    });
},

updateCity(request, response) {
    const countryId = request.params.id;
    const cityId = request.params.cityid;
    logger.debug("updating city " + cityId);
    const updatedCity = {
      id: cityId,
      city: request.body.city,
      type: request.body.type,
      popular: request.body.popular,
      rating: parseInt(request.body.rating)
    };
    TravelStore.editCity(countryId, cityId, updatedCity);
    response.redirect('/travel/' + countryId);
}


};

export default travel;