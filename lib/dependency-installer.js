'use strict';

const assert = require('assert');

module.exports = {

  installDependencies(params) {
    assert(params.package_names, 'package_named must be defined');
    assert(params.generator, 'generator must be defined');

    const options = params.options || {};

    params.generator.npmInstall(params.package_names, options);
  },

};
