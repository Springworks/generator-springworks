'use strict';

var gulp = require('gulp');


/**
 * Default task when running only `$ gulp`
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('default', ['bundle']);
};
