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
    addCity(id, city) {
    this.store.addItem(this.collection, id, this.array, city);
    },
    addCountry(country) {
    this.store.addCollection(this.collection, country);
    },
    removeCity(id, cityId) {
    this.store.removeItem(this.collection, id, this.array, cityId);
    },
    removeCountry(id) {
    const country = this.getDestination(id);
    this.store.removeCollection(this.collection, country);
    },

};

export default TravelStore;