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

  it('should update package.json with api name from input', () => {
    assert.jsonFileContent('packages/static-api/package.json', {
      name: `@springworks\/${api_name}-static`,
    });
  });

});
