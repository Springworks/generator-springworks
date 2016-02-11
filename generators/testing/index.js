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
      pkg.scripts.test = 'NODE_ENV=test istanbul cover _mocha';
      pkg.scripts['test-unit'] = 'NODE_ENV=test istanbul cover _mocha -- $(find test/**/unit test/unit -name \'*.js\' 2>/dev/null)';
      pkg.scripts['test-acceptance'] = 'NODE_ENV=test istanbul cover _mocha -- $(find test/**/acceptance test/acceptance -name \'*.js\' 2>/dev/null)';
      pkg.scripts['test-component'] = 'NODE_ENV=test istanbul cover _mocha -- $(find test/**/component test/component -name \'*.js\' 2>/dev/null)';
      this.write(pkg_path, JSON.stringify(pkg, null, 2));
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
