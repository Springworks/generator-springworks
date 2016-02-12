'use strict';

const _ = require('lodash');
const assert = require('assert');
const package_provider = require('../generators/testing/package-provider');

module.exports = {

  updatePackageFile(params) {
    assert(params.pkg_path, 'pkg_path must be specified');
    assert(params.changes, 'changes must be specified');
    assert(params.generator, 'generator must be specified');

    const pkg = package_provider.loadPackageFile(params.pkg_path);
    const result = _.merge(pkg, params.changes);
    const json = JSON.stringify(result, null, 2);

    params.generator.write(params.pkg_path, `${json}\n`);
  },

};
