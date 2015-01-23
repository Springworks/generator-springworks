'use strict';

var path = require('path');
var chalk = require('chalk'),
    gulp = require('gulp'),
    util = require('gulp-util'),
    livereload = require('gulp-livereload');


/**
 * Cleans everything that gulp can build.
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  var scripts_path = path.join(config['src-base-path'], 'scripts/**/*.js'),
      styles_path = path.join(config['src-base-path'], 'styles/**/*.less'),
      views_path = path.join(config['src-base-path'], 'views/**/*.jade'),
      i18n_path = path.join(config['src-base-path'], 'i18n/**/*.json');


  gulp.task('watch', function() {

    util.log('Watching ' + chalk.green('Scrips') + ' in ' + chalk.magenta(scripts_path));

    livereload.listen();

    gulp.watch(scripts_path, ['bundle-js']);
    gulp.watch(styles_path, ['styles']);
    gulp.watch(views_path, ['views']);
    gulp.watch(i18n_path, ['i18n']);
  });
};
