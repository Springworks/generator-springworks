'use strict';


/**
 * Configuration object for the `/login` endpoint.
 * The handler is exported separate from this base configuration.
 *
 * @type  {Object}
 */
exports.logout = {
  auth: 'session'
};


/**
 * Handler for the login page.
 *
 * @param   {Hapi.Request}  request  The request object.
 * @param   {Hapi.Reply}    reply    The reply object
 */
exports.logout.handler = function(request, reply) {
  request.auth.session.clear();
  reply.redirect('/');
};
