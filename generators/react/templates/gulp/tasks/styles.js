'use strict';

var chalk = require('chalk'),
    gulp = require('gulp'),
    util = require('gulp-util'),
    less = require('gulp-less'),
    size = require('gulp-size'),
    gulpif = require('gulp-if'),
    csscomb = require('gulp-csscomb'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber');


/**
 * Bundles all the less styles.
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('styles', function() {
    util.log('Compiling styles from ' + chalk.magenta(config.style_src) + ' to ' +
             chalk.magenta(config.style_dst) + '');

    return gulp.src([config.style_src, config.vendor_css_src])
               .pipe(plumber())
               .pipe(less({
                 sourceMap: !config.release,
                 sourceMapBasepath: config.style_dst
               }))
               .on('error', console.error.bind(console))
               .pipe(autoprefixer({ browsers: config.autoprefixer }))
               .pipe(csscomb())
               .pipe(gulpif(config.release, minifyCss()))
               .pipe(gulp.dest(config.style_dst))
               .pipe(size());
  });
};
