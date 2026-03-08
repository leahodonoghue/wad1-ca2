'use strict';

import logger from '../utils/logger.js';

const travel = {
    createView(request, response) {
        const viewData = {
            title: 'Destination'
        };
        response.render('destination', viewData);
    },
};

export default travel;