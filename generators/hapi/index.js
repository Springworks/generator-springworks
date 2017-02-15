'use strict';

const path = require('path');
const package_updater = require('../../lib/package-updater');
const dependency_installer = require('../../lib/dependency-installer');
const generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    this.composeWith(require.resolve('../babel-builder'));
    this.composeWith(require.resolve('../new-relic'));
    const welcomeMessage = [
      '\nSetting up Hapi with swaggerize-hapi\n',
    ];
    this.log(welcomeMessage.join(''));
  },

  writing: {

    updatePackageFile: function() {
      const pkg_path = path.join(process.cwd(), 'package.json');
      const changes = {
        main: 'server.js',
      };
      package_updater.updatePackageFile({
        pkg_path: pkg_path,
        changes: changes,
        generator: this,
      });
    },
    serverCopy: function() {
      this.copy('./server.js', './server.js');
    },

    indexCopy: function() {
      this.copy('./resources/api/index.js', './resources/api/index.js');
    },
    copyLib: function() {
      this.fs.copy(this.templatePath('./lib'), this.destinationPath('./lib'));
    },
  },

  install: {

    installDependencies: function() {
      const dependencies = [
        'hapi',
        'hapi-auth-basic',
        'swaggerize-hapi',
        '@springworks/hapi-default-extensions',
        '@springworks/logger-factory',
        '@springworks/bootstrapper',
      ];
      dependency_installer.installDependencies({
        generator: this,
        package_names: dependencies,
      });
    },

  },

});
