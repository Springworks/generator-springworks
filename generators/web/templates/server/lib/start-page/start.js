'use strict';


/**
 * Configuration object for the `/` endpoint.
 * The handler is exported separate from this base configuration.
 *
 * @type  {Object}
 */
exports.home = {
};


/**
 * Handler for the start page.
 *
 * @param   {Hapi.Request}  request  The request object.
 * @param   {Hapi.Reply}    reply    The reply object
 */
exports.home.handler = function(request, reply) {
  reply.view('index');
};
