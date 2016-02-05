'use strict';

const generators = require('yeoman-generator');

const module_dependencies = [
  '@springworks/static-api-server',
  'fixture-loader',
  'forever',
  'swagger-md',
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
      this.copy('index.js', 'packages/static-api/index.js');
      this.copy('run-server.js', 'packages/static-api/run-server.js');
      this.copy('bin/start-server.js', 'packages/static-api/bin/start-server.js');
      this.copy('bin/stop-server.js', 'packages/static-api/bin/stop-server.js');
    },

    packageFile: function() {
      this.template('_package.json', 'packages/static-api/package.json');
    },

    docs: function() {
      this.template('_README.md', 'packages/static-api/README.md');
    },

    binaries: function() {
      this.template('bin/generate-docs.js', 'bin/generate-docs.js');
      this.template('bin/generate-api-file.js', 'bin/generate-api-file.js');
    },
  },

  install: {

    installDependencies: function() {
      this.npmInstall(module_dependencies, { save: true });
    },

  },


});
