'use strict';

const assert = require('yeoman-assert');
const generators = require('yeoman-generator');
const helpers = require('yeoman-test');
const package_updater = require('../lib/package-updater');
const path = require('path');
const dependency_installer = require('../lib/dependency-installer');
const autorestoredSandbox = require('@springworks/test-harness/autorestored-sandbox');

describe('test/hapi-test.js', () => {
  const sinon_sandbox = autorestoredSandbox();

  let babel_builder_spy;
  let babel_builder_generator_stub;
  let new_relic_spy;
  let new_relic_generator_stub;

  beforeEach(() => {
    sinon_sandbox.stub(dependency_installer, 'installDependencies').returns();
  });

  beforeEach(() => {
    sinon_sandbox.stub(package_updater, 'updatePackageFile').returns();
  });

  beforeEach(() => {
    babel_builder_spy = sinon_sandbox.spy();
    babel_builder_generator_stub = generators.Base.extend({
      exec: babel_builder_spy,
    });
  });

  beforeEach(() => {
    new_relic_spy = sinon_sandbox.spy();
    new_relic_generator_stub = generators.Base.extend({
      exec: new_relic_spy,
    });
  });

  beforeEach(done => {
    helpers.run(path.join(__dirname, '..', 'generators', 'hapi'))
        .withOptions({
          'skip-install': true,
        })
        .withGenerators([
          [babel_builder_generator_stub, require.resolve('../generators/babel-builder')],
          [new_relic_generator_stub, require.resolve('../generators/new-relic')],
        ])
        .withPrompts()
        .on('end', done);
  });

  it('should compose with babel_builder', () => {
    assert(babel_builder_spy.calledOnce);
  });

  it('should compose with new_relic', () => {
    assert(new_relic_spy.calledOnce);
  });

  it('should copy index.js to ./resources/api', () => {
    assert.file('./resources/api/index.js');
  });

  it('should copy server.js to ./', () => {
    assert.file('./server.js');
  });

  it('should copy ping.js to ./lib/server/handlers/', () => {
    assert.file('./lib/server/handlers/ping.js');
  });

  it('should copy endpoint.js to ./lib/server/handlers/my/awesome/', () => {
    assert.file('./lib/server/handlers/my/awesome/endpoint.js');
  });

  it('should install hapi, hapi-auth-basic and swaggerize-hapi and as dependencies', () => {
    const call_args = dependency_installer.installDependencies.firstCall.args;
    call_args[0].should.have.property('generator');
    call_args[0].should.have.property('package_names', [
      'hapi',
      'hapi-auth-basic',
      'swaggerize-hapi',
      '@springworks/hapi-default-extensions',
      '@springworks/logger-factory',
      '@springworks/bootstrapper',
    ]);
  });


});
