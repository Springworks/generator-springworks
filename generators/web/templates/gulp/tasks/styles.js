'use strict';

var path = require('path');
var chalk = require('chalk'),
    gulp = require('gulp'),
    util = require('gulp-util'),
    gulpif = require('gulp-if'),
    less = require('gulp-less'),
    csso = require('gulp-csso'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload');



/**
 * Handler for less compiler errors
 *
 * @this   Gulp
 * @param  {Object}  err  The error object.
 */
function handleError(err) {
  util.log(err.toString());
  this.emit('end');
}


/**
 * Bundles all the less styles.
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  var source_files = path.join(config['src-base-path'], 'styles/index.less'),
      dest_path = path.join(config['dest-base-path'], 'styles');

  gulp.task('styles', function() {
    util.log('Compiling styles from ' + chalk.magenta(source_files) + ' to ' +
             chalk.magenta(dest_path) + '');

    return gulp.src(source_files)
               .pipe(plumber())
               .pipe(gulpif(!config.is_release, sourcemaps.init()))
               .pipe(less().on('error', handleError)) // Less compiler
               .pipe(csso()) // Minification
               .pipe(gulpif(!config.is_release, sourcemaps.write()))
               .pipe(gulp.dest(dest_path))
               .pipe(livereload());
  });
};
