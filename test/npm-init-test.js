'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const package_updater = require('../lib/package-updater');
const autorestoredSandbox = require('@springworks/test-harness/autorestored-sandbox');

describe('test/npm-init-test.js', () => {
  const sinon_sandbox = autorestoredSandbox();
  const repository_name = 'm2h-server-api';
  const description = 'this is my awesome api';

  beforeEach(() => {
    sinon_sandbox.stub(package_updater, 'updatePackageFile').returns();
  });

  beforeEach(done => {
    helpers.run(path.join(__dirname, '..', 'generators', 'npm-init'))
        .withPrompts({
          repository_name,
          description,
        })
        .on('end', done);
  });

  it('should copy README.md and set correct script names', () => {
    assert.file('README.md');
    assert.fileContent('README.md', /m2h-server-api/);
    assert.fileContent('README.md', /this is my awesome api/);
  });

  it('should copy package.json', () => {
    assert.file('package.json');
  });


  it('should update package.json with api name from input', () => {
    assert.jsonFileContent('package.json', {
      name: repository_name,
    });
  });

});
