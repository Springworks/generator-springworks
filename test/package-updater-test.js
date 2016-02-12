'use strict';

const updater = require('../lib/package-updater');
const package_provider = require('../generators/testing/package-provider');

describe('test/package-updater-test.js', () => {
  let sinon_sandbox;

  beforeEach(() => {
    sinon_sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sinon_sandbox.restore();
  });

  describe('updatePackageFile', () => {

    describe('with valid params', () => {
      let mock_generator;
      let original_package;
      let params;

      beforeEach(() => {
        original_package = {
          baz: 'baz',
        };
        sinon_sandbox.stub(package_provider, 'loadPackageFile').returns(original_package);
      });

      beforeEach(() => {
        mock_generator = {
          write: sinon_sandbox.stub(),
        };
      });

      beforeEach(() => {
        params = {
          pkg_path: '/dev/null',
          changes: { foo: 'bar' },
          generator: mock_generator,
        };
      });

      it('should invoke write() with changes merged into package file', () => {
        updater.updatePackageFile(params);

        const result_as_json = JSON.stringify({
          baz: 'baz',
          foo: 'bar',
        }, null, 2);

        const call_args = mock_generator.write.firstCall.args;
        call_args.should.eql([
          params.pkg_path,
          `${result_as_json}\n`,
        ]);
      });

    });

    describe('with invalid params', () => {

      it('should throw', () => {
        (() => updater.updatePackageFile({})).should.throw();
      });

    });

  });

});
