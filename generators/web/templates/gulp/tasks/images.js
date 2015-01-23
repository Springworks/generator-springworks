'use strict';

var path = require('path');
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
  var src_files = path.join(config['src-base-path'], 'images/*'),
      dest_path = path.join(config['dest-base-path'], 'images');

  gulp.task('images', function() {

    util.log('Copying images in ' + chalk.magenta(src_files) +
             ' to ' + chalk.magenta(dest_path));

    return gulp.src(src_files)
               .pipe(plumber())
               .pipe(gulpif(config.is_release, imagemin({
                  optimizationLevel: 5,
                  progressive: true,
                  interlaced: true
                })))
               .pipe(gulp.dest(dest_path));
  });
};
