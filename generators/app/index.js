'use strict';

var yeoman = require('yeoman-generator');


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
          '\nSpringworks Scaffolding Generator\n'
        ];
    this.log(welcomeMessage.join(''));
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
          },
          {
            type: 'list',
            name: 'projectVisibility',
            message: 'Is this a private or public project?',
            choices: [
              {
                name: 'Private',
                value: 'privateProject'
              },
              {
                name: 'Public',
                value: 'publicProject'
              }
            ],
            default: 0
          }
        ];

    this.prompt(prompts, function(answers) {
      this.appname = answers.projectName.toLowerCase();
      this.projectDescription = answers.projectDescription;
      this.privateProject = answers.projectVisibility === 'privateProject';
      done();
    }.bind(this));
  },

  // Writes configuration to the `.yo-rc.json` file
  configuring: function() {
    this.config.set({
      projectName: this.appname,
      projectDescription: this.projectDescription,
      privateProject: this.privateProject
    });
  },

  // Writes a bunch of files to the destination directory
  writing: {
    projectfiles: function() {
      this.template('_package.json', 'package.json');
      this.template('_README.md', 'README.md');

      if (!this.privateProject) { // Extra files for public projects
        this.copy('travis.yml', '.travis.yml');
        this.template('_LICENSE', 'LICENSE');
      }
    },

    gitFiles: function() {
      this.copy('gitignore', '.gitignore');

      if (this.privateProject) { // Extra files for private projects
        this.copy('gitattributes', '.gitattributes');
      }
    },

    testFiles: function() {
      this.copy('.istanbul.yml', '.istanbul.yml');
      this.copy('test/mocha.opts', 'test/mocha.opts');
    },

    lintFiles: function() {
      this.copy('eslintignore', '.eslintignore');
      this.copy('eslintrc', '.eslintrc');
      this.copy('test/eslintrc', 'test/.eslintrc');
    }
  },

  // Installs dependencies
  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      bower: false
    });
  }

});
