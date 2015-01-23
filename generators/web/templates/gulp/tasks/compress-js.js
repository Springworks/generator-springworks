'use strict';

var path = require('path');
var chalk = require('chalk'),
    gulp = require('gulp'),
    util = require('gulp-util'),
    size = require('gulp-size'),
    plumber = require('gulp-plumber'),
    gzip = require('gulp-gzip');


/**
 * Bundles all the vendor javascript.
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  var src_files = path.join(config['dest-base-path'], 'scripts/*.js'),
      dest_path = path.join(config['dest-base-path'], 'scripts');

  gulp.task('compress-js', function() {
    var size_options = { title: 'compress', showFiles: true };

    util.log('Compressing scripts in ' + chalk.magenta(src_files));

    return gulp.src(src_files)
               .pipe(plumber())
               .pipe(gzip())
               .pipe(size(size_options))
               .pipe(gulp.dest(dest_path));
  });
};
