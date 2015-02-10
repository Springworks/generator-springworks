'use strict';


/**
 * Configuration object for the `/fonts` endpoint.
 * The handler is exported separate from this base configuration.
 *
 * @type  {Object}
 */
exports.fonts = {};


/**
 * Handler for the fonts
 *
 * @param   {Hapi.Request}  request  The request object.
 * @param   {Hapi.Reply}    reply    The reply object
 */
exports.fonts.handler = {
  directory: {
    path: 'www/fonts',
    listing: false
  }
};
