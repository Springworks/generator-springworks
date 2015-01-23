'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    eslint = require('gulp-eslint');


/**
 * Lints the javascript files in the project.
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('lint', function() {
    return gulp.src(['lib/**/*.js'])
               .pipe(plumber())
               .pipe(eslint({
                 useEslintrc: true
               }))
               .pipe(eslint.format())
               .pipe(eslint.failOnError());
  });
};
