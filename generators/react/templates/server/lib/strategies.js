'use strict';

/**
 * Contains all the authentication strategies for the api.
 */

// var basic_auth = require('./common/auth/basic-auth.js');
var config = require('config');


/**
 * This array contains objects for all the authentication strategies
 * that are present and can be used in the system.
 *
 * @type  {Array}
 */
exports.strategies = [
  {
    name: 'session',
    mode: 'try',
    scheme: 'cookie',
    options: {
      password: config.get('security.session_cookie_password'),
      cookie: config.get('security.session_cookie_name'),
      redirectTo: '/',
      isSecure: false
    }
  }
];
