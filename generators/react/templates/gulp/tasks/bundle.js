'use strict';

var gulp = require('gulp'),
    util = require('gulp-util'),
    webpack = require('webpack');


/**
 * Bundles all the javascript.
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('bundle', function(cb) {
    var started = false;
    var webpack_config = require('../../config/webpack.config.js')(config);
    var bundler = webpack(webpack_config);

    function bundle(err, stats) {
      if (err) {
        throw new util.PluginError('webpack', err);
      }

      if (config.verbose) {
        util.log('[webpack]', stats.toString({colors: true}));
      }

      if (!started) {
        started = true;
        return cb();
      }
    }

    if (config.watch) {
      bundler.watch(200, bundle);
    }
    else {
      bundler.run(bundle);
    }
  });
};
