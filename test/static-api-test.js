'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('test/static-api-test.js', () => {
  const api_name = 'foo-app';

  before(done => {
    helpers.run(path.join(__dirname, '..', 'generators', 'static-api'))
        .withPrompts({
          apiName: api_name,
        })
        .on('end', done);
  });

  it('should copy index file', () => {
    assert.file('index.js');
  });

  it('should copy README.md and set correct script names', () => {
    assert.file('README.md');
    assert.fileContent('README.md', /start-foo-app-static/);
    assert.fileContent('README.md', /stop-foo-app-static/);
  });

  it('should copy scripts for starting server', () => {
    assert.file('bin/start-server.js');
  });

  it('should copy script for stopping server', () => {
    assert.file('bin/stop-server.js');
  });

  it('should copy script for running server', () => {
    assert.file('run-server.js');
  });

  it('should copy package.json', () => {
    assert.file('package.json');
  });

  it('should update package.json with api name from input', () => {
    assert.jsonFileContent('package.json', { name: `@springworks\/${api_name}-static` });
  });

});
