'use strict';

/**
 * membership-request service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::membership-request.membership-request');
