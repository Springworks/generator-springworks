'use strict';

var gulp = require('gulp'),
    util = require('gulp-util');
var sequence = require('run-sequence').use(gulp);


/**
 * Watches the directories for changes, runs task when needed.
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('watch', function() {
    util.log('Gulp is Watching');

    config.watch = true;
    sequence('bundle');

    gulp.watch(config.style_src, ['styles']);
    gulp.watch(config.u18n_src, ['i18n']);
  });
};
