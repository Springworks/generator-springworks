'use strict';

var path = require('path');
var chalk = require('chalk'),
    gulp = require('gulp'),
    util = require('gulp-util');


/**
 * Copies all the fonts
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  var src_files = path.join(config['src-base-path'], 'fonts/*'),
      dest_path = path.join(config['dest-base-path'], 'fonts');

  gulp.task('fonts', function() {

    util.log('Copying fonts in ' + chalk.magenta(src_files) +
             ' to ' + chalk.magenta(dest_path));

    return gulp.src(src_files)
               .pipe(gulp.dest(dest_path));
  });
};
