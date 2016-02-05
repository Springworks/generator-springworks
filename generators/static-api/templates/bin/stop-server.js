#! /usr/bin/env node

const forever = require('forever');
const path = require('path');

const script_path = path.join(__dirname, '..', 'run-server.js');

forever.stop(script_path);
