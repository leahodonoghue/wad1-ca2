'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below
// controllers
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import travel from './controllers/travel.js';
import stats from './controllers/stats.js';
import accounts from './controllers/accounts.js';

//home page
router.get('/', accounts.index);
router.get('/start', start.createView);
router.get('/about', about.createView);
router.get('/stats', stats.createView);

//dashboard - countries
router.get('/dashboard', dashboard.createView);
router.post('/dashboard/addcountry', dashboard.addCountry);
router.get('/dashboard/deletecountry/:id', dashboard.deleteCountry);

//travel - cities
router.get('/travel/:id', travel.createView);
router.post('/travel/:id/addcity', travel.addCity);
router.post('/travel/:id/updatecity/:cityid', travel.updateCity);
router.get('/travel/:id/deletedestination/:cityid', travel.deleteCity);

//search / sort 
router.get('/searchCategory', dashboard.createView);
router.get('/sortData', dashboard.createView);

//authentication
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);


export default router;
