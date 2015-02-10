'use strict';

var chalk = require('chalk'),
    gulp = require('gulp'),
    util = require('gulp-util'),
    gulpif = require('gulp-if'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin');


/**
 * Copies all the fonts
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('images', function() {
    util.log('Copying images in ' + chalk.magenta(config.image_src) +
             ' to ' + chalk.magenta(config.image_dst));

    return gulp.src(config.image_src)
               .pipe(plumber())
               .pipe(gulpif(config.release, imagemin({
                  optimizationLevel: 5,
                  progressive: true,
                  interlaced: true
                })))
               .pipe(gulp.dest(config.image_dst));
  });
};
