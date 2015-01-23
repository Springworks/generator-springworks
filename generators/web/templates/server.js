'use strict';
/**
 * This is the main file for the Vehicle Info API. This file should be run in
 * production environment. It uses the `api-server.js` for setting up all the
 * routes and plugins and so on. It will also hook into various events on the
 * system, so it can handle graceful shutdowns and so on.
 */

var path = require('path');
var config = require('config'),
    bunyan = require('bunyan'),
    Promise = require('bluebird');

var ApiServer = require('./server/api-server.js');

var server,
    logger = bunyan.createLogger({
               name: config.get('logging.name'), level: config.get('logging.level')
             }),
    internals = {};


/**
 * Setups and starts the whole server.
 */
internals.setupAndStart = function() {
  // Hook in to process signals to do graceful shutdown
  process.on('SIGINT', internals.gracefulShutdown);
  process.on('SIGTERM', internals.gracefulShutdown);

  // Start the whole server
  internals.initializeServer()
    .then(internals.registerViews)
    .then(internals.startServer)
    .then(internals.logSuccessfulStart)
    .catch(internals.logFailedStart);
};


/**
 * Initializes the server.
 *
 * @return  {Promise}  A promise.
 */
internals.initializeServer = function() {
  server = ApiServer.create({
    port: config.get('server.port'),
    host: config.get('server.host'),
    routes: require('./server/lib/routes.js').endpoints,
    plugins: require('./server/lib/plugins.js').plugins,
    strategies: require('./server/lib/strategies.js').strategies
  });
  return server.initialize();
};


/**
 * Registers the views plugin for the server.
 *
 * @param   {String}  init_msg  The init message.
 * @return  {Promise}           A promise.
 */
internals.registerViews = function(init_msg) {
  logger.info('Server initialized: %s', init_msg);
  return new Promise(function(resolve, reject) {
    server.server.views({
      engines: {
        jade: require('jade')
      },
      path: path.join(__dirname, '/server/views'),
      isCached: config.get('server.template_cache.enabled'),
      compileOptions: {
        pretty: config.get('jade.pretty'),
        debug: config.get('jade.debug')
      }
    });
    resolve('Views registered');
  });
};


/**
 * Tries to start the server
 *
 * @param   {String}  view_msg  Message from the initalization step.
 * @return  {Promise}           A promise.
 */
internals.startServer = function(view_msg) {
  logger.info('Jade plugin started: %s', view_msg);
  return server.startServer();
};


/**
 * Logs a successful start attempt
 *
 * @param   {String}  start_msg  Information about the start.
 */
internals.logSuccessfulStart = function(start_msg) {
  logger.info('Server started: %s', start_msg);
};


/**
 * Logs a failed start attempt
 *
 * @param   {Error}  err  The thrown error from one of the steps.
 */
internals.logFailedStart = function(err) {
  logger.fatal(err, 'Error starting server');
};


/**
 * Performs a graceful shut-down of the server.
 */
internals.gracefulShutdown = function() {
  var timeout = config.get('server.shutdown_timeout');

  logger.info('About to stop server (timeout: %d ms)', timeout);
  server.stopServer(timeout)
    .then(function() {
      logger.info('Server stopped');
      process.exit(0);
    });
};


// Start the whole server
internals.setupAndStart();
