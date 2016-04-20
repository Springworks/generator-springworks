'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const package_provider = require('../generators/testing/package-provider');

describe('test/testing-test.js', () => {
  let sinon_sandbox;

  beforeEach(() => {
    sinon_sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sinon_sandbox.restore();
  });

  beforeEach(() => {
    sinon_sandbox.stub(package_provider, 'loadPackageFile').returns({
      scripts: {},
    });
  });

  beforeEach(done => {
    helpers.run(path.join(__dirname, '..', 'generators', 'testing'))
        .withOptions({
          'skip-install': true,
        })
        .withPrompts()
        .on('end', done);
  });

  it('should copy mocha.opts to test directory', () => {
    assert.file(path.join('test', 'mocha.opts'));
  });

  it('should add test scripts to package.json', () => {
    const expected_testing_scripts = {
      test: 'NODE_ENV=test istanbul cover _mocha',
      'test-no-cov': 'NODE_ENV=test mocha',
      'test-acceptance': 'NODE_ENV=test istanbul cover _mocha -- --fgrep \'/acceptance/\'',
      'test-component': 'NODE_ENV=test istanbul cover _mocha -- --fgrep \'/component/\'',
      'test-unit': 'NODE_ENV=test istanbul cover _mocha -- --fgrep \'/unit/\'',
    };
    assert.jsonFileContent('package.json', { scripts: expected_testing_scripts });
  });

});
