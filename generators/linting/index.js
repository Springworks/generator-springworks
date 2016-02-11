'use strict';

const path = require('path');
const generators = require('yeoman-generator');

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
