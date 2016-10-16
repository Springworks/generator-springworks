'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const dependency_installer = require('../lib/dependency-installer');
const package_updater = require('../lib/package-updater');
const autorestoredSandbox = require('@springworks/test-harness/autorestored-sandbox');

describe('test/static-api-test.js', () => {
  const sinon_sandbox = autorestoredSandbox();
  const api_name = 'foo-app';

  beforeEach(() => {
    sinon_sandbox.stub(dependency_installer, 'installDependencies').returns();
  });

  beforeEach(() => {
    sinon_sandbox.stub(package_updater, 'updatePackageFile').returns();
  });

  beforeEach(done => {
    helpers.run(path.join(__dirname, '..', 'generators', 'static-api'))
        .withOptions({
          'skip-install': true,
        })
        .withPrompts({
          apiName: api_name,
        })
        .on('end', done);
  });

  it('should copy index file', () => {
    assert.file('packages/static-api/index.js');
  });

  it('should copy README.md and set correct script names', () => {
    const readme_path = 'packages/static-api/README.md';
    assert.file(readme_path);
    assert.fileContent(readme_path, /start-foo-app-static/);
    assert.fileContent(readme_path, /stop-foo-app-static/);
  });

  it('should copy scripts for starting server', () => {
    assert.file('packages/static-api/bin/start-server.js');
  });

  it('should copy script for stopping server', () => {
    assert.file('packages/static-api/bin/stop-server.js');
  });

  it('should copy script for running server', () => {
    assert.file('packages/static-api/run-server.js');
  });

  it('should copy package.json', () => {
    assert.file('packages/static-api/package.json');
  });

  it('should copy script for generating API', () => {
    assert.file('bin/generate-api-file.js');
  });

  it('should copy script for generating docs', () => {
    assert.file('bin/generate-docs.js');
  });

  it('should update package.json with api name from input', () => {
    assert.jsonFileContent('packages/static-api/package.json', {
      name: `@springworks/${api_name}-static`,
    });
  });

  it('should install swagger-tools as dev dependency', () => {
    const call_args = dependency_installer.installDependencies.firstCall.args;
    call_args[0].should.have.property('generator');
    call_args[0].should.have.property('package_names', [
      'swagger-md',
      'swagger-tools',
    ]);
    call_args[0].should.have.property('options', { saveDev: true });
  });

  it('should add static API  scripts to package.json', () => {
    const call_args = package_updater.updatePackageFile.firstCall.args;
    call_args[0].should.have.property('changes', {
      api: './bin/generate-api-file.js',
      docs: './bin/generate-docs.js',
      'static-api': 'npm run api ; npm run docs',
    });
  });
});
