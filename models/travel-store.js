'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const TravelStore = {

    store: new JsonStore('./models/travel-store.json', { TravelDestinations: [] }),
    collection: 'TravelDestinations',
    array: 'destinations',

    getAllTravelDestinations() {
        return this.store.findAll(this.collection);
    },
    getDestination(id) {
        return this.store.findOneBy(this.collection, (destination => destination.id === id));
    },
};

export default TravelStore;