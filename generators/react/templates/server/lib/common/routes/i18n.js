'use strict';


/**
 * Configuration object for the `/i18n` endpoint.
 * The handler is exported separate from this base configuration.
 *
 * @type  {Object}
 */
exports.i18n = {};


/**
 * Handler for the i18n files
 *
 * @param   {Hapi.Request}  request  The request object.
 * @param   {Hapi.Reply}    reply    The reply object
 */
exports.i18n.handler = {
  directory: {
    path: 'www/i18n',
    listing: false
  }
};
