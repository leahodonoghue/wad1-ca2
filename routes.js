'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
router.get('/', start.createView);

import dashboard from './controllers/dashboard.js';
router.get('/dashboard', dashboard.createView);

import about from './controllers/about.js';
router.get('/about', about.createView);

import travel from './controllers/travel.js';
router.get('/travel/:id', travel.createView);

router.post('/travel/:id/addcity', travel.addCity);
router.post('/dashboard/addcountry', dashboard.addCountry);

router.get('/travel/:id/deletedestination/:cityid', travel.deleteCity);
router.get('/dashboard/deletecountry/:id', dashboard.deleteCountry);

router.post('/travel/:id/updatecity/:cityid', travel.updateCity);

import stats from './controllers/stats.js';
router.get('/stats', stats.createView);


export default router;
