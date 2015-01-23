'use strict';


/**
 * Configuration object for the `/views` endpoint.
 * The handler is exported separate from this base configuration.
 *
 * @type  {Object}
 */
exports.views = {};


/**
 * Handler for the views
 *
 * @param   {Hapi.Request}  request  The request object.
 * @param   {Hapi.Reply}    reply    The reply object
 */
exports.views.handler = {
  directory: {
    path: 'www/views',
    listing: false
  }
};
