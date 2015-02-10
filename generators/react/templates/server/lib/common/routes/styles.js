'use strict';


/**
 * Configuration object for the `/styles` endpoint.
 * The handler is exported separate from this base configuration.
 *
 * @type  {Object}
 */
exports.styles = {};


/**
 * Handler for the styles
 *
 * @param   {Hapi.Request}  request  The request object.
 * @param   {Hapi.Reply}    reply    The reply object
 */
exports.styles.handler = {
  directory: {
    path: 'www/styles',
    listing: false
  }
};
