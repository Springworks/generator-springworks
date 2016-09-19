'use strict';

const path = require('path');
const generators = require('yeoman-generator');
const package_updater = require('../../lib/package-updater');
const dependency_installer = require('../../lib/dependency-installer');

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  forceConflictsToAvoidUnecessaryPrompts: function() {
    this.conflicter.force = true;
  },

  initializing: function() {
    const welcomeMessage = [
      '\n',
      'Configuring babel project...',
      '\n',
    ];
    this.log(welcomeMessage.join(''));
  },

  writing: {

    mochaConfig: function() {
      this.copy('.babelrc', '.babelrc');
    },

    updatePackageFile: function() {
      const pkg_path = path.join(process.cwd(), 'package.json');
      const changes = {
        scripts: {
          build: 'rm -rf build && babel src --out-dir build',
          prepublish: 'npm run build',
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

    installDevDependencies: function() {
      const dependencies = [
        'babel-cli',
        'babel-plugin-transform-strict-mode',
        'babel-preset-es2015-node4',
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
