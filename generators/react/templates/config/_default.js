'use strict';


/**
 * Default configuration should be as close to production config as possible.
 * Any REQUIRED deviations can be added to environment-specific >env>.js files.
 *
 * @type {Object}
 */
module.exports = {

  // Server configuration
  server: {
    host: 'localhost',
    port: 3000,
    base_uri: '',
    shutdown_timeout: 1000,

    template_cache: {
      enabled: false
    },

    options: {
      debug: {
        request: ['error']
      }
    }
  },

  security: {
    cookie_password: 'changme-1',
    session_cookie_password: 'changme-2',
    session_cookie_name: 'changme-3'
  },

  // Logging
  logging: {
    name: '<%= _.slugify(appname) %>',
    level: 'info'
  },

  devel: {
    long_stacktrace: false
  },

  // Jade config
  jade: {
    pretty: true,
    debug: false
  }
};
