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
    assert.jsonFileContent('package.json', {
      scripts: {
        test: 'NODE_ENV=test istanbul cover _mocha',
        'test-unit': 'NODE_ENV=test istanbul cover _mocha -- $(find test/**/unit test/unit -name \'*.js\' 2>/dev/null)',
        'test-acceptance': 'NODE_ENV=test istanbul cover _mocha -- $(find test/**/acceptance test/acceptance -name \'*.js\' 2>/dev/null)',
        'test-component': 'NODE_ENV=test istanbul cover _mocha -- $(find test/**/component test/component -name \'*.js\' 2>/dev/null)',
      },
    });
  });

});
