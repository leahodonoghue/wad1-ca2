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

    async addCity(id, city, file, response) {
        try {
            city.picture = await this.store.addToCloudinary(file);
            this.store.addItem(this.collection, id, this.array, city);
            response();
        } catch (error) {
            logger.error("Error processing city:", error);
            response(error);
        }
    },

    addCountry(country) {
    this.store.addCollection(this.collection, country);
    },

      async removeCity(id, cityId, response) {
    const country = this.getDestination(id);
    const city = country.destinations.find(city => city.id === cityId);

    if (city.picture && city.picture.public_id) {
      try {
        await this.store.deleteFromCloudinary(city.picture.public_id);
        logger.info("Cloudinary image deleted");
      } catch (err) {
        logger.error("Failed to delete Cloudinary image:", err);
      }
    }

    this.store.removeItem(this.collection, id, this.array, cityId);
    response();
  },


    removeCountry(id) {
    const country = this.getDestination(id);
    this.store.removeCollection(this.collection, country);
    },

    editCity(id, cityId, updatedCity) {
    this.store.editItem(this.collection, id, cityId, this.array, updatedCity);
    },

    searchCountries(search) {
    return this.store.findBy(
      this.collection,
      (country => country.country.toLowerCase().includes(search.toLowerCase())))
    },

    getUserCountries(userid) {
    return this.store.findBy(this.collection, (country => country.userid === userid));
    },

    searchUserCountries(search, userid) {
    return this.store.findBy(
    this.collection,
    (country => country.userid === userid && country.country.toLowerCase().includes(search.toLowerCase())))
    }, 

     




};

export default TravelStore;