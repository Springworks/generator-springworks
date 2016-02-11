'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('test/linting-test.js', () => {

  before(done => {
    helpers.run(path.join(__dirname, '..', 'generators', 'linting'))
        .withOptions({
          'skip-install': true,
        })
        .withPrompts()
        .on('end', done);
  });

  it('should copy .eslintrc to root dir', () => {
    assert.file('.eslintrc');
  });

  it('should copy .eslintrc to test dir', () => {
    assert.file(path.join('test', '.eslintrc'));
  });

  it('should copy .eslintignore to root dir', () => {
    assert.file('.eslintignore');
  });

});
