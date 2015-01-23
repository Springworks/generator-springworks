'use strict';

var path = require('path');
var chalk = require('chalk'),
    gulp = require('gulp'),
    util = require('gulp-util'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload');


/**
 * Copies all the fonts
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  var src_files = path.join(config['src-base-path'], 'views/**/*.jade'),
      dest_path = path.join(config['dest-base-path'], 'views');

  gulp.task('views', function() {

    util.log('Compiling views in ' + chalk.magenta(src_files) +
             ' to ' + chalk.magenta(dest_path));

    return gulp.src(src_files)
               .pipe(plumber())
               .pipe(jade({

               }))
               .pipe(gulp.dest(dest_path))
               .pipe(livereload());
  });
};
