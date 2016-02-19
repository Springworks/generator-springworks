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
      '\nSetting up linting\n',
    ];
    this.log(welcomeMessage.join(''));
  },

  writing: {

    linterConfigs: function() {
      this.copy('.eslintrc', '.eslintrc');
      this.copy(path.join('test', '.eslintrc'), path.join('test', '.eslintrc'));
    },

    linterIgnoreFile: function() {
      this.copy('.eslintignore', '.eslintignore');
    },

    updatePackageFile: function() {
      const pkg_path = path.join(process.cwd(), 'package.json');
      const changes = {
        scripts: {
          lint: 'eslint --cache .',
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
        'babel-eslint',
        'eslint',
        'eslint-config-springworks',
        'eslint-plugin-import',
        'eslint-plugin-mocha',
        'eslint-plugin-should-promised',
        'eslint-plugin-springworks',
      ];
      this.npmInstall(dependencies, { saveDev: true });
    },

  },

});
