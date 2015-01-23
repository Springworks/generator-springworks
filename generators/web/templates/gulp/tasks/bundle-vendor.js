'use strict';

var path = require('path');
var chalk = require('chalk'),
    gulp = require('gulp'),
    util = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    mainBowerFiles = require('main-bower-files'),
    plumber = require('gulp-plumber'),
    size = require('gulp-size');


/**
 * Bundles all the vendor javascript.
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  var dest_path = path.join(config['dest-base-path'], 'scripts');

  gulp.task('bundle-vendor', function() {
    var size_options = { title: 'bundle-vendor', showFiles: true };

    util.log('Compiling vendor libraries defined in ' + chalk.magenta('bower.json') + ' to ' +
             chalk.magenta(dest_path + '/bundle-vendor.min.js') + '');

    return gulp.src(mainBowerFiles({ filter: '**/*.js' }))
               .pipe(plumber())
               .pipe(concat('bundle-vendor.min.js'))
               .pipe(ngAnnotate())
               .pipe(uglify())
               .pipe(size(size_options))
               .pipe(gulp.dest(dest_path));
  });
};
