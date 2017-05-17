'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const package_updater = require('../lib/package-updater');
const dependency_installer = require('../lib/dependency-installer');

describe('test/babel-builder-test.js', () => {
  let sinon_sandbox;

  beforeEach(() => {
    sinon_sandbox = sinon.sandbox.create();
  });

  beforeEach(() => {
    sinon_sandbox.stub(package_updater, 'updatePackageFile').returns();
  });

  beforeEach(() => {
    sinon_sandbox.stub(dependency_installer, 'installDependencies').returns();
  });

  beforeEach(done => {
    helpers.run(path.join(__dirname, '..', 'generators', 'babel-builder'))
        .withOptions({
          'skip-install': true,
        })
        .withPrompts()
        .on('end', done);
  });

  afterEach(() => {
    sinon_sandbox.restore();
  });

  it('should copy .babelrc to root dir', () => {
    assert.file('.babelrc');
  });

  it('should add build scripts to package.json', () => {
    const call_args = package_updater.updatePackageFile.firstCall.args;
    call_args[0].changes.should.eql({
      scripts: {
        build: 'rm -rf build && babel src --out-dir build',
        prepublish: 'npm run build',
      },
    });
  });

  it('should install required babel dev dependencies', () => {
    const call_args = dependency_installer.installDependencies.firstCall.args;
    dependency_installer.installDependencies.should.be.calledOnce();
    call_args[0].should.have.property('generator');
    call_args[0].should.have.property('package_names', [
      'babel-cli',
      'babel-register',
      'babel-preset-env',
    ]);
    call_args[0].should.have.property('options', { saveDev: true });
  });

});
