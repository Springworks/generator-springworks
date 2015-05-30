'use strict';

var path = require('path');
var chalk = require('chalk'),
    gulp = require('gulp'),
    util = require('gulp-util'),
    rimraf = require('gulp-rimraf');


/**
 * Cleans everything that gulp can build.
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  var dest_path = path.join(config.base_dst, '/*');

  gulp.task('clean', function() {
    util.log('Cleaning ' + chalk.magenta(dest_path));

    return gulp.src(dest_path, { read: false }).pipe(rimraf({ force: true }));
  });
};
