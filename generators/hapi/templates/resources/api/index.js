module.exports = {
  swagger: '2.0',
  info: {
    version: '1',
    title: '',
    description: '',
  },
  host: '',
  basePath: '/v1',
  securityDefinitions: {
    basicAuth: {
      type: 'basic',
      description: 'Required to authenticate requests.',
    },
  },
  security: [
    {
      basicAuth: [],
    },
  ],
  schemes: [
    'https',
  ],
  consumes: [
    'application/json',
  ],
  produces: [
    'application/json',
  ],
  paths: {
    '/ping': {
      get: {
        description: 'Health check',
        tags: [
          'ping',
        ],
        security: [],
        responses: {
          200: {
            description: 'Response means server is healthy',
          },
        },
      },
    },
    '/my/awesome/endpoint': {
      get: {
        description: 'Example endpoint',
        responses: {
          200: {
            description: 'Example response',
          },
        },
      },
    },
  },
  definitions: {
  },
};
