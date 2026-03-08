'use strict';

import logger from '../utils/logger.js';

const travel = {
    createView(request, response) {
        const viewData = {
            title: 'Destination'
        };
        response.render('travel', viewData);
    },
};

export default travel;