'use strict';


/**
 * Production configuration should be as close to production config as possible.
 * Any REQUIRED deviations can be added to environment-specific >env>.js files.
 *
 * @type {Object}
 */
module.exports = {
  server: {
    host: '0.0.0.0',
    port: 80,
    base_uri: '',
    shutdown_timeout: (1 * 1000)
  }
};
