import  swaggerJsdoc from 'swagger-jsdoc'

const options = {
  failOnError:true, //weather or not to throw error when parsing errors 
  definition: {
    openapi: '3.0.0',
    servers:[{
      url:`${process.env.SERVER_URL}/api/v1`,
    }
    ], 
    info: {
      title: 'Bootcamp management system ',
      version: '1.0.0',
    },
    components:{
      securitySchemes:{
        barerAuth:{
          type:'http',
          schema:'bearer',
          bearerFormat:"JWT",
        }
      }
    },
    security:[{
      bearerAuth:[]
    }], 


  },

  apis: ['routes/*.js'], 
};

export default  swaggerJsdoc(options);