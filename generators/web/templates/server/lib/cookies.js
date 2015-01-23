'use strict';


/**
 * Exports all the states / Cookies for the server.
 *
 * @type  {Array}
 */
exports.cookies = [
  {
    name: 'cookie',
    options: {
      ttl: 30 * 24 * 60 * 60 * 1000,
      path: '/',
      clearInvalid: true,
      isHttpOnly: true,
      encoding: 'none'
    }
  }
];
