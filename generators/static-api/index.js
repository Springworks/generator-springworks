'use strict';

const generators = require('yeoman-generator');

const module_dependencies = [
  '@springworks/static-api-server',
  'fixture-loader',
  'forever',
];

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    const welcomeMessage = [
      '\nGenerate a static API\n',
    ];
    this.log(welcomeMessage.join(''));
  },

  prompting: function() {
    const done = this.async();
    const prompts = [
      {
        type: 'input',
        name: 'apiName',
        message: 'Name of API',
      },
    ];

    this.prompt(prompts, function(answers) {
      this.appname = answers.apiName.toLowerCase();
      done();
    }.bind(this));
  },

  configuring: function() {
    this.config.set({
      apiName: this.appname,
    });
  },

  writing: {

    serverScripts: function() {
      this.copy('index.js', 'index.js');
      this.copy('run-server.js', 'run-server.js');
      this.copy('bin/start-server.js', 'bin/start-server.js');
      this.copy('bin/stop-server.js', 'bin/stop-server.js');
    },

    packageFile: function() {
      this.template('_package.json', 'package.json');
    },

    docs: function() {
      this.template('_README.md', 'README.md');
    },
  },

  install: {

    installDependencies: function() {
      this.npmInstall(module_dependencies, { save: true });
    },

  },


});
