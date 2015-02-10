'use strict';


/**
 * Configuration object for the `/images` endpoint.
 * The handler is exported separate from this base configuration.
 *
 * @type  {Object}
 */
exports.images = {};


/**
 * Handler for the images
 *
 * @param   {Hapi.Request}  request  The request object.
 * @param   {Hapi.Reply}    reply    The reply object
 */
exports.images.handler = {
  directory: {
    path: 'www/images',
    listing: false
  }
};
