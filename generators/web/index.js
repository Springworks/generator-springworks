'use strict';

var yeoman = require('yeoman-generator'),
    chalk = require('chalk');


/**
 * Exports the generator
 */
module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.option('skip-install', {desc: 'Skip npm install'});
  },

  initializing: function() {
    var welcomeMessage = [
          '\nSpringworks',
          chalk.bold.green('Web Scaffolding'),
          'Generator\n'
        ];
    this.log(welcomeMessage.join(' '));
    this.currentYear = (new Date()).getFullYear();
  },

  // Ask the user a couple of questions
  prompting: function() {
    var done = this.async(),

        prompts = [
          {
            type: 'input',
            name: 'projectName',
            message: 'What\'s your project name?',
            default: this.appname
          },
          {
            type: 'input',
            name: 'projectDescription',
            message: 'Whats\'s your project description?',
            default: this.appname
          }
        ];

    this.prompt(prompts, function(answers) {
      this.appname = answers.projectName.toLowerCase();
      this.projectDescription = answers.projectDescription;
      done();
    }.bind(this));
  },

  // Writes configuration to the `.yo-rc.json` file
  configuring: function() {
    this.config.set({
      projectName: this.appname,
      projectDescription: this.projectDescription
    });
  },

  // Writes a bunch of files to the destination directory
  writing: {
    projectfiles: function() {
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_README.md', 'README.md');
      this.copy('bowerrc', '.bowerrc');
    },

    gitFiles: function() {
      this.copy('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
    },

    lintFiles: function() {
      this.copy('eslintignore', '.eslintignore');
      this.copy('eslintrc', '.eslintrc');
      this.copy('gjslintrc', '.gjslintrc'); // Skoog specific ;)
    },

    npmFiles: function() {
      this.copy('npmignore', '.npmignore');
    },

    gulpFiles: function() {
      this.copy('gulpfile', 'gulpfile.js');
      this.directory('gulp', 'gulp');
    },

    serverFiles: function() {
      this.template('config/_default.js', 'config/default.js');
      this.copy('config/development.js', 'config/development.js');
      this.copy('config/production.js', 'config/production.js');
      this.copy('config/test.js', 'config/test.js');
      this.copy('server.js', 'server.js');
      this.directory('server', 'server');
    },

    clientFiles: function() {
      this.directory('client', 'client');
    }

  },

  // Installs dependencies and run a gulp build
  install: function() {
    /* istanbul ignore if */
    if (!this.options['skip-install']) {
      this.installDependencies({
        skipInstall: false,
        bower: true,
        callback: function () {
          this.spawnCommand('gulp', ['build']);
        }.bind(this)
      });
    }
  }

});
