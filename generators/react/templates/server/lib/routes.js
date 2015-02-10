'use strict';
/**
 * This file contains all the enpoints in the API. The reason behind this file is that
 * we get a much better overview of the whole api if we gather all the endpoints in one
 * single file.
 *
 * The configuration for each endpoint should be place in a seperate file for that base
 * resource. See below for more information.
 */

var config = require('config');
var base_uri = config.get('server.base_uri'),
    internals = {};


/**
 * Require all route configuration here. These configuration files should export one
 * config {Object} per endpoint, in the standard format for HapiJS route configs.
 *
 * @see http://hapijs.com/api#route-options
 */
var ping_config = require('./common/routes/ping.js'),

    // Auth route configs
    session_config = require('./common/sessions.js'),

    // Static route configs
    fonts_config = require('./common/routes/fonts.js'),
    images_config = require('./common/routes/images.js'),
    scrips_config = require('./common/routes/scripts.js'),
    styles_config = require('./common/routes/styles.js'),
    i18n_config = require('./common/routes/i18n.js'),

    // Dynamic routes
    start_config = require('./start-page/start.js');


/**
 * All the endpoints for the api. Storing them in an array so we can map the base_uri
 * onto the path before exporting the array.
 */
var endpoints = [

  // All the common utility endpoints.
  {method: ['GET', 'HEAD'], path: '/ping', config: ping_config.ping},

  // Static file serving routes
  {method: 'GET', path: '/images/{param*}', config: images_config.images},
  {method: 'GET', path: '/styles/{param*}', config: styles_config.styles},
  {method: 'GET', path: '/scripts/{param*}', config: scrips_config.scripts},
  {method: 'GET', path: '/fonts/{param*}', config: fonts_config.fonts},
  {method: 'GET', path: '/i18n/{param*}', config: i18n_config.i18n},

  // Login/Logout
  // {method: ['GET', 'POST'], path: '/login', config: github_config.github},
  {method: 'get', path: '/logout', config: session_config.logout},

  // Pages
  {method: 'GET', path: '/', config: start_config.home}
];


/**
 * Maps the paths for the endpoints, prefixing them with base uris
 *
 * @param   {Array}  endpoints_array  The array of endpoints.
 * @return  {Array}                   The prefixed endpoints.
 */
internals.prefixPaths = function(endpoints_array) {
  return endpoints_array.map(function(endpoint) {
    endpoint.path = base_uri.concat(endpoint.path);
    return endpoint;
  });
};


/**
 * Exports all the Endpoints for the API after we've mapped on the base_uri to the path.
 *
 * @type  {Array}
 */
exports.endpoints = internals.prefixPaths(endpoints);


/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') {
  /** @protected */
  exports.internals = internals;
}
