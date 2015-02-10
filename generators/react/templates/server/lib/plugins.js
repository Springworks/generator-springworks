'use strict';

// var path = require('path');


/**
 * Exports an array of all plugin with their configurations for the server.
 *
 * @type  {Array}
 */
exports.plugins = [
  {
    register: require('hapi-auth-cookie')
  }
];
