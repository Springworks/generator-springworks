'use strict';

var fs = require('fs');
var argv = require('yargs').argv;
var tasks = fs.readdirSync('./gulp/tasks/');
var config = require('./gulp-config.js');


/**
 * Gets the release flag from the cli.
 *
 * @type  {Boolean}
 */
config.release = argv.release || false;

// Register all tasks with gulp
tasks.forEach(function(task) {
  require('./tasks/' + task)(config);
});
