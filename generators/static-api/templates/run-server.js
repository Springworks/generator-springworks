const index = require('./index');
const args = process.argv;

index.createApiServer({ host: args[2], port: args[3] })
    .then(created_server => {
      created_server.start(err => {
        if (err) {
          process.exit(1);
        }
      });
    });
