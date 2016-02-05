#! /usr/bin/env node

const forever = require('forever');
const path = require('path');

if (process.argv.length !== 4) {
  console.log('ERROR: Please provide \'host\' and \'port\' arguments to \'start-server\'');
  console.log('');
  console.log('USAGE: start-server <host> <port>');
  process.exit(1);
}

const script_path = path.join(__dirname, '..', 'run-server.js');
forever.startDaemon(script_path, {
  args: [
    process.argv[2],
    process.argv[3],
  ],
});
