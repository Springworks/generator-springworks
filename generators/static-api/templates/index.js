const path = require('path');
const static_server = require('@springworks/static-api-server');
const fixture_loader = require('fixture-loader');

const swagger_spec = require('./api.json');
const fixtures_path = path.join(__dirname, 'fixtures');
const created_fixture_loader = fixture_loader.create(fixtures_path);

module.exports = {

  createApiServer: function(params) {
    return static_server.default.createServer({
      swagger_spec: swagger_spec,
      fixture_loader: created_fixture_loader,
      host: params.host || 'localhost',
      port: params.port || 3001,
    });
  },

  provideFixtures: function() {
    return created_fixture_loader;
  },

};
