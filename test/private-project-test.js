'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('springworks:app (private)', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        projectName: 'Test Project',
        projectDescription: 'Test Project Description',
        projectVisibility: 'privateProject'
      })
      .on('end', done);
  });

  it('creates files for private projects', function() {
    var expected = [
          '.yo-rc.json',
          '.gitignore',
          '.gitattributes',
          '.eslintignore',
          '.eslintrc',
          '.npmignore',
          'test/.eslintrc',
          'test/mocha.opts',
          '.istanbul.yml',
          'README.md'
        ];
    assert.file(expected);
  });

  it('should not create files for public projects', function() {
    var files = [
          '.travis.yml',
          'LICENSE'
        ];
    assert.noFile(files);
  });

  it('fills package.json with correct information', function() {
    assert.fileContent('package.json', /"name": "test-project"/);
    assert.fileContent('package.json', /"description": "Test Project Description"/);
    assert.fileContent('package.json', /"private": true/);
  });

  it('fills README.md with the correct information', function() {
    assert.fileContent('README.md', /# test-project/);
  });

});
