'use strict';

var gulp = require('gulp');
var sequence = require('run-sequence').use(gulp);


/**
 * Default task when running only `$ gulp`
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('build', function(done) {
    sequence(
        'clean',
        [ // These tasks can be run in paralell
          'bundle-js',
          'bundle-vendor'
        ],
        'compress-js',
        [ // These tasks can be run in paralell
          'fonts',
          'i18n',
          'styles',
          'images',
          'views'
        ],
        done);
  });
};
