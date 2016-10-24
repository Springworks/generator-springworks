'use strict';

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');

describe('test/new-relic-test.js', () => {

  beforeEach(done => {
    helpers.run(path.join(__dirname, '..', 'generators', 'new-relic'))
        .withOptions({
          'skip-install': true,
        })
        .withPrompts()
        .on('end', done);
  });

  it('should copy .gitattributes to root dir', () => {
    assert.file('.gitattributes');
  });

  it('should copy newrelic.js to test dir', () => {
    assert.file('newrelic.js');
  });

});
