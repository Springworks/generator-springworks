'use strict';

var gulp = require('gulp');
var sequence = require('run-sequence').use(gulp);


/**
 * Default task when running only `$ gulp`
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('build', ['clean'], function(done) {
    sequence(['bundle', 'vendor', 'i18n', 'styles', 'images'], done);
  });
};
