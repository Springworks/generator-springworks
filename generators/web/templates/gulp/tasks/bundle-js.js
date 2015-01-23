'use strict';

var path = require('path');
var chalk = require('chalk'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    util = require('gulp-util'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload');


/**
 * Bundles all the javascript (except the vendor bundle).
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  var source_path = path.join(config['src-base-path'], 'scripts/**/*.js'),
      dest_path = path.join(config['dest-base-path'], 'scripts');

  gulp.task('bundle-js', function() {
    var size_options = { title: 'bundle-js', showFiles: true };

    util.log('Compiling bundle from ' + chalk.magenta(source_path) + ' to ' +
             chalk.magenta(dest_path) + '');

    return gulp.src([source_path])
        .pipe(plumber())
        .pipe(gulpif(!config.is_release, sourcemaps.init()))
        .pipe(concat('bundle.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulpif(!config.is_release, sourcemaps.write()))
        .pipe(size(size_options))
        .pipe(gulp.dest(dest_path))
        .pipe(livereload());
  });
};
