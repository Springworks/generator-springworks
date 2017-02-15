import Bootstrapper from '@springworks/bootstrapper';
const pkg = require('../package.json');
const logger_factory = require('@springworks/logger-factory');
const logger = logger_factory.create('auto-generated-logger', 'info', __dirname); //TODO - configure logger appropriately
const bootstrapper = Bootstrapper.create(pkg, process, logger);

bootstrapper.bootstrap({

  upstart() {
    throw new Error('Insert server startup code here');
  },

  shutdown() {
    throw new Error('Insert server shutdown code here');
  },

});
