'use strict';

var gulp = require('gulp');


/**
 * Combined task for javascript bundling.
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('scripts', ['bundle-js', 'bundle-vendor']);
};
