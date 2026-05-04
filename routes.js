'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
router.get('/start', start.createView);

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

router.get('/searchCategory', dashboard.createView);

router.get('/sortData', dashboard.createView);

import accounts from './controllers/accounts.js';
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

export default router;
