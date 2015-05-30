'use strict';

var fs = require('fs');
var gulp = require('gulp'),
    util = require('gulp-util'),
    inquirer = require('inquirer'),
    semver = require('semver');
var pkg = require('../../package.json');


/**
 * Bumps the version of `package.json` and `bower.json`
 *
 * @param  {Object}  config  Config object for the task.
 */
module.exports = function(config) {
  gulp.task('bump', function(done) {
    var choices = ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'];

    util.log('Current version:', util.colors.cyan(pkg.version));

    choices = choices.map(function(versionType) {
      return versionType + ' (v' + semver.inc(pkg.version, versionType) + ')';
    });

    inquirer.prompt({
      type: 'list',
      name: 'version',
      message: 'What version update would you like?',
      choices: choices
    }, function(res) {
      var increment = res.version.split(' ')[0],
          newVersion = semver.inc(pkg.version, increment);

      // Set the new versions into the bower/package object
      pkg.version = newVersion;

      // Write these to their own files, then build the output
      fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));

      done();
    });
  });
};
