'use strict';

// var path = require('path');


/**
 * Exports an array of all plugin with their configurations for the server.
 *
 * @type  {Array}
 */
exports.plugins = [
  {
    plugin: require('hapi-auth-cookie')
  },
  {
    plugin: require('hapi-auth-basic')
  }
];
