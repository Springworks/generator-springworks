'use strict';

const path = require('path');
const generators = require('yeoman-generator');
const dependency_installer = require('../../lib/dependency-installer');
const package_updater = require('../../lib/package-updater');

const static_api_dependencies = [
  '@springworks/static-api-server',
  'fixture-loader',
  'forever',
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

    scripts: function() {
      const pkg_path = path.join(process.cwd(), 'package.json');
      package_updater.updatePackageFile({
        pkg_path: pkg_path,
        changes: {
          api: './bin/generate-api-file.js',
          docs: './bin/generate-docs.js',
          'static-api': 'yarn run api ; yarn run docs',
        }, generator: this,
      });
    },
  },

  install: {

    installDevDependencies: function() {
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

    installStaticApiDependencies: function() {
      this.on('end', function() {
        if (!this.options['skip-install']) {
          const static_api_install_args = ['install', '--save'].concat(static_api_dependencies);
          this.spawnCommandSync('npm', static_api_install_args, { cwd: static_api_package_dir });
        }
      });
    },

  },


});
