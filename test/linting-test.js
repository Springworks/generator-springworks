'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const package_updater = require('../lib/package-updater');
const autorestoredSandbox = require('@springworks/test-harness/autorestored-sandbox');

describe('test/linting-test.js', () => {
  const sinon_sandbox = autorestoredSandbox();

  beforeEach(() => {
    sinon_sandbox.stub(package_updater, 'updatePackageFile').returns();
  });

  beforeEach(done => {
    helpers.run(path.join(__dirname, '..', 'generators', 'linting'))
        .withOptions({
          'skip-install': true,
        })
        .withPrompts()
        .on('end', done);
  });

  it('should copy .eslintrc to root dir', () => {
    assert.file('.eslintrc.json');
  });

  it('should copy .eslintrc to test dir', () => {
    assert.file(path.join('test', '.eslintrc.json'));
  });

  it('should copy .eslintignore to root dir', () => {
    assert.file('.eslintignore');
  });

  it('should add "lint" script to package file', () => {
    const call_args = package_updater.updatePackageFile.firstCall.args;
    call_args[0].changes.should.eql({
      scripts: {
        lint: 'eslint --cache .',
      },
    });
  });

});
