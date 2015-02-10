'use strict';

var gulp = require('gulp'),
    merge = require('merge-stream');


/**
 * Creates all the vendor specific stuff. At the moment this is the bootstrap fonts.
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('vendor', function() {
    return merge(
          gulp.src(config.font_src)
              .pipe(gulp.dest(config.font_dst))
        );
  });
};
