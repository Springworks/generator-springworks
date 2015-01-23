'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('springworks:web (Web Projects)', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/web'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        projectName: 'Springular',
        projectDescription: 'Springworks Angular Seed Project'
      })
      .on('end', done);
  });

  it('creates files for private projects', function() {
    var expected = [
          '.bowerrc',
          '.eslintignore',
          '.eslintrc',
          '.gitattributes',
          '.gitignore',
          '.gjslintrc',
          '.npmignore',
          '.yo-rc.json',
          'README.md',
          'bower.json',
          'client/fonts/.gitkeep',
          'client/i18n/available.json',
          'client/images/.gitkeep',
          'client/scripts/.eslintrc',
          'client/scripts/components/version/interpolate-filter.js',
          'client/scripts/components/version/version-directive.js',
          'client/scripts/components/version/version.js',
          'client/scripts/index.js',
          'client/scripts/view1/view1.js',
          'client/scripts/view2/view2.js',
          'client/styles/index.less',
          'client/views/view1.jade',
          'client/views/view2.jade',
          'config/default.js',
          'config/development.js',
          'config/production.js',
          'config/test.js',
          'gulp/index.js',
          'gulp/tasks/build.js',
          'gulp/tasks/bump.js',
          'gulp/tasks/bundle-js.js',
          'gulp/tasks/bundle-vendor.js',
          'gulp/tasks/clean.js',
          'gulp/tasks/compress-js.js',
          'gulp/tasks/default.js',
          'gulp/tasks/fonts.js',
          'gulp/tasks/i18n.js',
          'gulp/tasks/images.js',
          'gulp/tasks/lint.js',
          'gulp/tasks/scripts.js',
          'gulp/tasks/styles.js',
          'gulp/tasks/views.js',
          'gulp/tasks/watch.js',
          'gulpfile.js',
          'package.json',
          'server/api-server.js',
          'server/lib/common/auth/basic-auth.js',
          'server/lib/common/routes/fonts.js',
          'server/lib/common/routes/i18n.js',
          'server/lib/common/routes/images.js',
          'server/lib/common/routes/ping.js',
          'server/lib/common/routes/scripts.js',
          'server/lib/common/routes/styles.js',
          'server/lib/common/routes/views.js',
          'server/lib/cookies.js',
          'server/lib/plugins.js',
          'server/lib/routes.js',
          'server/lib/start-page',
          'server/lib/start-page/start.js',
          'server/lib/strategies.js',
          'server/test/.eslintrc',
          'server/views/index.jade',
          'server/views/layout.jade',
          'server.js'
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
    assert.fileContent('package.json', /"name": "springular"/);
    assert.fileContent('package.json', /"description": "Springworks Angular Seed Project"/);
  });

  it('fills bower.json with correct information', function() {
    assert.fileContent('bower.json', /"name": "springular"/);
    assert.fileContent('bower.json', /"description": "Springworks Angular Seed Project"/);
  });

  it('fills README.md with the correct information', function() {
    assert.fileContent('README.md', /# springular/);
  });

});
