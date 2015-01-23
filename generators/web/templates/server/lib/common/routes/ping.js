'use strict';


/**
 * Configuration object for the `/ping` endpoint.
 * The handler is exported separate from this base configuration.
 *
 * @type  {Object}
 */
exports.ping = {};


/**
 * Handler for the search request. Validates parameters and
 * sends them along to the actual handler.
 *
 * @param   {Hapi.Request}  request  The request object.
 * @param   {Hapi.Reply}    reply    The reply object
 */
exports.ping.handler = function(request, reply) {
  reply({});
};
