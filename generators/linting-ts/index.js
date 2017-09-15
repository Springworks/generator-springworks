'use strict';

const path = require('path');
const generators = require('yeoman-generator');
const package_updater = require('../../lib/package-updater');

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    const welcomeMessage = [
      '\nSetting up linting for Type Script\n',
    ];
    this.log(welcomeMessage.join(''));
  },

  writing: {

    linterConfigs: function() {
      this.copy('tslint.json', 'tslint.json');
      this.copy('tsconfig.json', 'tsconfig.json');
    },

    updatePackageFile: function() {
      const pkg_path = path.join(process.cwd(), 'package.json');
      const changes = {
        scripts: {
          lint: 'tslint -p ./tsconfig.json',
        },
      };
      package_updater.updatePackageFile({
        pkg_path: pkg_path,
        changes: changes,
        generator: this,
      });
    },

  },

  install: {

    installDependencies: function() {
      const dependencies = [
        'tslint',
        '@springworks/tslint-config',
      ];
      this.npmInstall(dependencies, { saveDev: true });
    },

  },

});
