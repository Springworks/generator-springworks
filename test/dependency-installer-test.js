'use strict';

const installer = require('../lib/dependency-installer');

describe('test/dependency-installer-test.js', () => {
  let sinon_sandbox;

  beforeEach(() => {
    sinon_sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sinon_sandbox.restore();
  });


  describe('installDependencies', () => {

    describe('with valid params', () => {
      let params;
      let mock_generator;

      beforeEach(() => {
        mock_generator = {
          npmInstall: sinon_sandbox.stub(),
        };
      });

      beforeEach(() => {
        params = {
          package_names: [
            'lodash',
            'fel',
          ],
          generator: mock_generator,
          options: {
            saveDev: true,
          },
        };
      });

      it('should invoke generator function to install provided dependencies', () => {
        installer.installDependencies(params);
        const call_args = mock_generator.npmInstall.firstCall.args;
        call_args.should.eql([
          params.package_names,
          params.options,
        ]);
      });

    });

    describe('with invalid params', () => {

      it('should throw', () => {
        (() => installer.installDependencies({})).should.throw();
      });

    });

  });

});
