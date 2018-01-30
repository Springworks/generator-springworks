#!/usr/bin/env node

/**
 * Generates markdown documentation based on the Swagger specification.
 *
 * Not run through Babel, so needs to be Node 4 compliant.
 */

const fs = require('fs');
const swagger_md = require('swagger-md');
const api_spec = require('../resources/api/index');
const static_api = require('../packages/static-api');

const filename = 'API.md';

function provideResponseExample(path, method) {
  const base_path = api_spec.basePath || '';
  const full_path = base_path + path;
  try {
    const json = static_api.provideFixtures().loadParsedJson(full_path, method);
    if (json.length === 0) {
      return 'N/A';
    }
    const stringified = JSON.stringify(json, null, 2);
    return [
      '```json',
      stringified,
      '```',
    ].join('\n');
  }
  catch (e) {
    return 'N/A';
  }
}

swagger_md.default.convertToMarkdown(api_spec, { response_example_provider: provideResponseExample }).then(markdown => {
  fs.writeFileSync(filename, markdown);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
