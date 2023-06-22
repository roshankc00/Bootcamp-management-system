import  swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bootcamp management system ',
      version: '1.0.0',
    },
  },
  apis: ['routes/*.js'], 
};

export default  swaggerJsdoc(options);