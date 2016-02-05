'use strict';

const generators = require('yeoman-generator');

const module_dependencies = [
  '@springworks/static-api-server',
  'fixture-loader',
  'forever',
  'swagger-md',
];

const static_api_package_dir = 'packages/static-api';

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
      this.copy('index.js', `${static_api_package_dir}/index.js`);
      this.copy('run-server.js', `${static_api_package_dir}/run-server.js`);
      this.copy('bin/start-server.js', `${static_api_package_dir}/bin/start-server.js`);
      this.copy('bin/stop-server.js', `${static_api_package_dir}/bin/stop-server.js`);
    },

    packageFile: function() {
      this.template('_package.json', `${static_api_package_dir}/package.json`);
    },

    docs: function() {
      this.template('_README.md', `${static_api_package_dir}/README.md`);
    },

    binaries: function() {
      this.template('bin/generate-docs.js', 'bin/generate-docs.js');
      this.template('bin/generate-api-file.js', 'bin/generate-api-file.js');
    },
  },

  install: {

    installDependencies: function() {
      this.on('end', function() {
        if (!this.options['skip-install']) {
          const install_args = ['install', '--save'].concat(module_dependencies);
          this.spawnCommandSync('npm', install_args, { cwd: static_api_package_dir });
        }
      });
    },

  },


});
