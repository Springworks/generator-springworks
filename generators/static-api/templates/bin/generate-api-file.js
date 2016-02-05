#!/usr/bin/env node

/**
 * Generates an api.json file based on js input.
 *
 * Not run through Babel, so needs to be Node 4 compliant.
 */

const fs = require('fs');
const path = require('path');
const api_spec = require('../resources/api/index');
const target_filename = path.join(__dirname, '..', 'packages', 'static-api', 'api.json');

const api_as_json = JSON.stringify(api_spec, null, 2) + '\n';

fs.writeFileSync(target_filename, api_as_json);
