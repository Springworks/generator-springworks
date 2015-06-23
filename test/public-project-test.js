'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('springworks:app (public)', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        projectName: 'Test Project',
        projectDescription: 'Test Project Description',
        projectVisibility: 'publicProject'
      })
      .on('end', done);
  });

  it('creates files for public projects', function() {
    var expected = [
          '.yo-rc.json',
          '.gitignore',
          '.travis.yml',
          'LICENSE',
          '.eslintignore',
          '.eslintrc',
          '.npmignore',
          'README.md'
        ];
    assert.file(expected);
  });

  it('should not create files for private projects', function() {
    var files = [
          '.gitattributes'
        ];
    assert.noFile(files);
  });

  it('fills package.json with correct information', function() {
    assert.fileContent('package.json', /"name": "test-project"/);
    assert.fileContent('package.json', /"description": "Test Project Description"/);
    assert.fileContent('package.json', /"private": false/);
    assert.fileContent('package.json', /"license": "MIT"/);
  });

  it('fills README.md with the correct information', function() {
    assert.fileContent('README.md', /# test-project/);
  });

});
