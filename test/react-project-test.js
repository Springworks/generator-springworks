'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('springworks:react (React Projects)', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/react'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        projectName: 'Reactular',
        projectDescription: 'Springworks React Seed Project'
      })
      .on('end', done);
  });

  it('creates files for private projects', function() {
    var expected = [
          './README.md',
          './client',
          './client/assets',
          './client/assets/i18n',
          './client/assets/i18n/available.json',
          './client/assets/images',
          './client/assets/styles',
          './client/assets/styles/index.less',
          './client/scripts',
          './client/scripts/components',
          './client/scripts/components/mycomponent.jsx',
          './client/scripts/login.jsx',
          './config',
          './config/default.js',
          './config/development.js',
          './config/production.js',
          './config/test.js',
          './config/webpack.config.js',
          './gulp',
          './gulp/gulp-config.js',
          './gulp/index.js',
          './gulp/tasks',
          './gulp/tasks/build.js',
          './gulp/tasks/bump.js',
          './gulp/tasks/bundle.js',
          './gulp/tasks/clean.js',
          './gulp/tasks/default.js',
          './gulp/tasks/i18n.js',
          './gulp/tasks/images.js',
          './gulp/tasks/lint.js',
          './gulp/tasks/styles.js',
          './gulp/tasks/vendor.js',
          './gulp/tasks/watch.js',
          './gulpfile.js',
          './package.json',
          './server',
          './server/api-server.js',
          './server/lib',
          './server/lib/common',
          './server/lib/common/auth',
          './server/lib/common/auth/basic-auth.js',
          './server/lib/common/routes',
          './server/lib/common/routes/fonts.js',
          './server/lib/common/routes/i18n.js',
          './server/lib/common/routes/images.js',
          './server/lib/common/routes/ping.js',
          './server/lib/common/routes/scripts.js',
          './server/lib/common/routes/styles.js',
          './server/lib/common/sessions.js',
          './server/lib/cookies.js',
          './server/lib/plugins.js',
          './server/lib/routes.js',
          './server/lib/start-page',
          './server/lib/start-page/start.js',
          './server/lib/strategies.js',
          './server/test',
          './server/views',
          './server/views/index.jade',
          './server.js'
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
    assert.fileContent('package.json', /"name": "reactular"/);
    assert.fileContent('package.json', /"description": "Springworks React Seed Project"/);
  });

  it('fills README.md with the correct information', function() {
    assert.fileContent('README.md', /# reactular/);
  });

});
