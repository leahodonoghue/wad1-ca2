'use strict';

import logger from '../utils/logger.js';
import TavelStore from '../models/travel-store.js';

const travel = {
    createView(request, response) {
       const destinationId = request.params.id;
       logger.debug(`Destination id = ${destinationId}`);

        const viewData = {
            title: 'Destination',
            singleDestination: TravelStore.getDestination(destinationId)
        };
        response.render('travel', viewData);
    },
};

export default travel;