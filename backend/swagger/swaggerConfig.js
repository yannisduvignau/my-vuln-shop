const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express + PostgreSQL',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3001' }],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);