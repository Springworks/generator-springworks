/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: ['<INSERT-APPLICATION-NAME-HERE>'],

  /**
   * Your New Relic license key.
   */
  license_key: '<INSERT-LICENSE-KEY-HERE>',

  logging: {
    enabled: false,
  },
  agent_enabled: process.env.NODE_ENV === 'production',
  high_security: true,
};
