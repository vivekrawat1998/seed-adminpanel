'use strict';

/**
 * download-log service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::download-log.download-log');
