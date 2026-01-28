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
    {
      url: 'https://crm-backend.onrender.com',
      description: 'Render server',
    },
  ],
  tags: [
    {
      name: 'staff',

      description: 'Staff Management'
    },
    { name: 'Auth', description: 'Authentication' },
    { name: 'Roles', description: 'Role Management' },
    { name: 'Permissions', description: 'Permission Management' },
    { name: 'Teams', description: 'Team Management' },
    { name: 'Employee', description: 'Employee Management' },
    { name: 'Insurance', description: 'Insurance Management' },
    { name: 'Offers', description: 'Offers Management' },
    { name: 'UsersOffers', description: 'UsersOffers Management' },
    { name: 'HealthTests', description: 'Health Tests Management' },
    { name: 'UserHealthTests', description: 'User Health Tests Management' },
    { name: 'HealthPackages', description: 'Health Packages Management' },
    { name: 'UserHealthPackages', description: 'User Health Packages Management' },
    { name: 'Doctors', description: 'Doctors Management' },
    { name: 'Doctors_Appoitments', description: 'Doctors Appoitments Management' },
    { name: 'MedicalHistory', description: 'Medical History Management' },
    { name: 'Ratings', description: 'Ratings Management' },
  ],

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
