'use strict';

const path = require('path');
const generators = require('yeoman-generator');

const package_provider = require('./package-provider');

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    const welcomeMessage = [
      '\n',
      'Setting up structure for tests...',
      '\n',
      'Don\'t be worried by any `package.json` conflicts, it\'s updated nicely.',
      '\n',
    ];
    this.log(welcomeMessage.join(''));
  },

  writing: {

    mochaConfig: function() {
      this.copy('mocha.opts', path.join('test', 'mocha.opts'));
    },

    updatePackageFile: function() {
      const pkg_path = path.join(process.cwd(), 'package.json');
      const pkg = package_provider.loadPackageFile(pkg_path);
      const testing_scripts = {
        test: 'NODE_ENV=test istanbul cover _mocha',
        'test-no-cov': 'NODE_ENV=test mocha',
        'test-acceptance': 'NODE_ENV=test istanbul cover _mocha -- --fgrep \'/acceptance/\'',
        'test-component': 'NODE_ENV=test istanbul cover _mocha -- --fgrep \'/component/\'',
        'test-unit': 'NODE_ENV=test istanbul cover _mocha -- --fgrep \'/unit/\'',
      };
      Object.assign(pkg.scripts, testing_scripts);
      this.write(pkg_path, JSON.stringify(pkg, null, 2) + '\n');
    },

  },

  install: {

    installDependencies: function() {
      const dependencies = [
        '@springworks/test-harness',
        'mocha',
        'istanbul',
      ];
      this.npmInstall(dependencies, { saveDev: true });
    },

  },

});
