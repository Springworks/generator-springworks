#!/usr/bin/env node

/**
 * Generates an api.json file based on js input.
 *
 * Not run through Babel, so needs to be Node 4 compliant.
 */

const fs = require('fs');
const path = require('path');
const swagger_tools = require('swagger-tools');
const api_spec = require('../resources/api/index');
const target_filename = path.join(__dirname, '..', 'packages', 'static-api', 'api.json');

const internals = {

  validateSwaggerSpec(swagger_api, callback) {
    const swagger_spec = swagger_tools.specs.v2;
    swagger_spec.validate(swagger_api, (err, result) => {
      if (err) {
        callback(err);
        return;
      }

      if (!result) {
        callback(null, null);
        return;
      }

      if (!result.errors.length && !result.warnings.length) {
        callback(null, null);
        return;
      }

      if (result.errors.length > 0) {
        console.log('Invalid Swagger spec:');
        console.log('');
        console.log('Errors');
        console.log('------');
        result.errors.forEach(function(err) {
          console.log('#/' + err.path.join('/') + ': ' + err.message);
        });
        console.log('');
      }

      if (result.warnings.length > 0) {
        console.log('Warnings');
        console.log('--------');
        result.warnings.forEach(function(warn) {
          console.log('#/' + warn.path.join('/') + ': ' + warn.message);
        });
        console.log('');
      }

      const error = new Error('Swagger spec has issues');
      callback(error, null);
    });
  },

  writeSwaggerFile(swagger_api) {
    const api_as_json = JSON.stringify(swagger_api, null, 2) + '\n';
    fs.writeFileSync(target_filename, api_as_json);
  },

};

internals.validateSwaggerSpec(api_spec, err => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }

  internals.writeSwaggerFile(api_spec);
});
