'use strict';

var chalk = require('chalk'),
    gulp = require('gulp'),
    util = require('gulp-util');


/**
 * Copies all the fonts
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('i18n', function() {
    util.log('Copying i18n files in ' + chalk.magenta(config.i18n_src) +
             ' to ' + chalk.magenta(config.i18n_dst));

    return gulp.src(config.i18n_src)
               .pipe(gulp.dest(config.i18n_dst));
  });
};
