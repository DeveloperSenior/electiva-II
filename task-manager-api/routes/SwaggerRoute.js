const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerModelValidator =  require('swagger-model-validator');
const router = express.Router();

const options = {
  failOnErrors: true,
  swaggerDefinition: {
    info: {
      title: 'REST - Swagger',
      version: '1.0.0',
      description: 'REST API with Swagger doc',
      contact: {
        email: 'aescoba7@correo.tdea.edu.co',
      },
    },
    tags: [
      {
        name: 'Task Manager',
        description: 'Tasks Manager API',
      },
    ],
    schemes: ['http'],
    host: 'localhost:3000',
    basePath: '/api/v1',
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
//swaggerModelValidator(swaggerSpec);

router.get('/json',  (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

const validateModel = (name, model) => {
  const responseValidation = swaggerSpec.validateModel(
    name,
    model,
    false,
    true
  );
  if (!responseValidation.valid) {
    console.error(responseValidation.errors);
    throw new Error(`Model doesn't match Swagger contract`);
  }
}

module.exports = router