'use strict';

var fs = require('fs');
var argv = require('yargs').argv;
var tasks = fs.readdirSync('./gulp/tasks/');


var config = {
      'src-base-path': 'client/',
      'dest-base-path': 'www/'
    };


/**
 * Gets the release flag from the cli.
 *
 * @type  {Boolean}
 */
config.is_release = argv.release;

// Register all tasks with gulp
tasks.forEach(function(task) {
  require('./tasks/' + task)(config);
});
