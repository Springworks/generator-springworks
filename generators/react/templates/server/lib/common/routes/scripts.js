'use strict';


/**
 * Configuration object for the `/scripts` endpoint.
 * The handler is exported separate from this base configuration.
 *
 * @type  {Object}
 */
exports.scripts = {};


/**
 * Handler for the scripts
 *
 * @param   {Hapi.Request}  request  The request object.
 * @param   {Hapi.Reply}    reply    The reply object
 */
exports.scripts.handler = {
  directory: {
    path: 'www/scripts',
    listing: false
  }
};
