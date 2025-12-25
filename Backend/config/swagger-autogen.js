import swaggerAutogen from 'swagger-autogen';

const swagger = swaggerAutogen({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Health CRM API',
    description: 'API documentation with Auth & RBAC',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local server',
    },
  ],
//  tags: [
//   { name: 'Auth', description: 'Authentication APIs' },
//   { name: 'Roles', description: 'Role management APIs' },
//   { name: 'Permissions', description: 'Permission management APIs' },
//   { name: 'Teams', description: 'Team management APIs' },
// ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swagger(outputFile, endpointsFiles, doc);
