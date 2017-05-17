'use strict';

const generators = require('yeoman-generator');

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    const welcomeMessage = [
      '\nSetting up New Relic monitoring\n',
    ];
    this.log(welcomeMessage.join(''));
  },

  writing: {

    gitCryptConfig: function() {
      this.copy('.gitattributes', '.gitattributes');
    },

    newRelicConfig: function() {
      this.copy('newrelic.js', 'newrelic.js');
    },

  },

  install: {

    installDependencies: function() {
      const dependencies = [
        'newrelic',
        '@newrelic/native-metrics',
      ];
      this.npmInstall(dependencies, { save: true });
    },

  },

});
