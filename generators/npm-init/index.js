'use strict';

const generators = require('yeoman-generator');
const dependency_installer = require('../../lib/dependency-installer');
const path = require('path');

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    const welcomeMessage = [
      '\nGenerate a Springworks package.json\n',
    ];
    this.log(welcomeMessage.join(''));
  },

  prompting: function() {
    const done = this.async();
    let guessed_name = path.basename(this.destinationRoot());
    if (guessed_name.substring(0, 3) === 'm2h-') {
      guessed_name = guessed_name.substring(4, guessed_name.length - 1);
    }

    const prompts = [
      {
        type: 'input',
        name: 'server_name',
        message: 'Name of the server (full name will be @springworks/{server_name})',
        default: guessed_name,
      },
      {
        type: 'input',
        name: 'description',
        message: 'description:',
      },
    ];


    this.prompt(prompts, function(answers) {
        this.server_name = answers.server_name;
        this.description = answers.description;
      done();
    }.bind(this));
  },

  configuring: function() {
    this.config.set({
      server_name: this.server_name,
      description: this.description,
    });
  },

  writing: {

    packageFile: function() {
      this.log('writing npm-init:package.json');
      this.template('_package.json', './package.json');
    },

    docs: function() {
      this.log('writing npm-init:docs');
      this.template('_README.md', `${this.destinationRoot()}/README.md`, {
        server_name: this.server_name,
        description: this.description,
      });
    },
  },

  install: {

    installDevDependencies: function() {
      this.log('npm-init:installing');

      const dependencies = [
        'swagger-md',
        'swagger-tools',
      ];
      dependency_installer.installDependencies({
        generator: this,
        package_names: dependencies,
        options: {
          saveDev: true,
        },
      });
    },

  },

});
