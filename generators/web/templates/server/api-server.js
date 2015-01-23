'use strict';
/**
 * This files servers as the API server. It will setup the server and have
 * methods for starting and stopping the server. The reason behind it being
 * in this file is that we want to use it during test.
 */

var hapi = require('hapi'),
    hoek = require('hoek'),
    Promise = require('bluebird'),
    config = require('config');

var internals = {
      defaults: {
        port: config.get('server.port'),
        host: config.get('server.host'),
        shutdown_timeout: config.get('server.shutdown_timeout')
      }
    };


/**
 * Creates a new instance of the api-server.
 *
 * @param   {Object=}  opt_options  Optional Options.
 * @return  {[type]}               [description]
 */
exports.create = function(opt_options) {
  return new ApiServer(opt_options || {});
};



/**
 * Creates a new instance of the ApiServer.
 *
 * @constructor
 * @param  {Object=}  opt_options  Optional options
 */
function ApiServer(opt_options) {
  this.options = hoek.applyToDefaults(internals.defaults, opt_options);
}


/**
 * Configures the server with
 *
 * @this    ApiServer
 * @param   {Object=}  opt_options  Optional options.
 * @return  {Promise}               A promise that will be fulfilled once the server is initialized.
 */
ApiServer.prototype.initialize = Promise.method(function(opt_options) {
  var override_options = {};

  // If we're testing we don't want the server to hijack the logging.
  /* istanbul ignore else */
  if (process.env.NODE_ENV === 'test') {
    override_options.debug = false;
  }

  // Create the server
  this.options = hoek.applyToDefaults(this.options, (opt_options || {}));
  this.server = new hapi.Server(this.options.host, this.options.port, override_options);

  // Register all the needed plugins
  return internals.registerPlugins(this)

    // Register all the needed authentication strategies.
    .then(internals.registerStrategies)

    // Register all the routes
    .then(internals.registerRoutes)

    // Resolve the whole initialize flow
    .then(function() {
      return 'Server Initialized';
    });
});


/**
 * Wraps the Hapi Inject function with a promise. Since the assertion library throws
 * and it's not possible to catch exceptions from anonymous callbacks in mocha.
 *
 * @param   {Object}    options   The options for the injection.
 * @return  {Promise}             A promise that always resolves to the response.
 */
ApiServer.prototype.inject = function(options) {
  var this_server = this;

  return new Promise(function(resolve, reject) {
    this_server.server.inject(options, function(response) {
      resolve(response);
    });
  });
};


/**
 * Starts the server.
 *
 * @return  {Promise}  A promise that will be fullfilled once the server has started.
 */
ApiServer.prototype.startServer = Promise.method(function() {
  var this_server = this;

  return new Promise(function(resolve, reject) {
    this_server.server.start(function() {
      resolve(this_server.server.info.uri);
    });
  });
});


/**
 * Stops the api server.
 *
 * @param   {Number=}  opt_timeout  Optional timeout for shutdown of the server.
 * @return  {Promise}               A promise that will be fullfilled once the server has stopped.
 */
ApiServer.prototype.stopServer = Promise.method(function(opt_timeout) {
  var timeout = opt_timeout || this.options.shutdown_timeout,
      this_server = this;

  return new Promise(function(resolve, reject) {
    this_server.server.stop({'timeout': timeout}, function() {
      resolve('Server stopped');
    });
  });
});


// Internal functions


/**
 * Registers all the plugins for the server provided.
 *
 * @param   {ApiServer}  api_server  The Hapi server instance.
 * @return  {Promise}                A promise that will only reject if there is any errors.
 *                                   It will resolve even though there is no plugins.
 */
internals.registerPlugins = function(api_server) {
  return new Promise(function(resolve, reject) {
    if (Array.isArray(api_server.options.plugins) && api_server.options.plugins.length > 0) {
      api_server.server.pack.register(api_server.options.plugins, function(err) {
        if (err) {
          return reject(new Error(err));
        }
        return resolve(api_server);
      });
    }
    else {
      resolve(api_server);
    }
  });
};


/**
 * Registers all the authentication strategies for the server provided.
 *
 * @param   {ApiServer}  api_server  The Hapi server instance.
 * @return  {Promise}                A promise.
 */
internals.registerStrategies = function(api_server) {
  return new Promise(function(resolve, reject) {
    var strategies = api_server.options.strategies;

    if (Array.isArray(strategies)) {
      strategies.forEach(function(strategy) {
        api_server.server.auth.strategy(strategy.name, strategy.scheme, strategy.options);
      });
    }

    resolve(api_server);
  });
};


/**
 * Registers all the routes for the server provided.
 *
 * @param   {ApiServer}  api_server  The Hapi server instance.
 * @return  {Promise}                A promise.
 */
internals.registerRoutes = function(api_server) {
  return new Promise(function(resolve, reject) {
    var routes = api_server.options.routes;

    if (! Array.isArray(routes) || routes.length === 0) {
      return reject(new Error('You must supply at least one route.'));
    }

    api_server.server.route(routes);
    return resolve(api_server);
  });
};


/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') {
  /** @protected */
  exports.internals = internals;
}
