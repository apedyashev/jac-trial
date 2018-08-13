import express from 'express';
const router = express.Router();
import swaggerJSDoc from 'swagger-jsdoc';
import config from 'config';

router.get('/', (req, res) => {
  const options = {
    swaggerDefinition: {
      info: {
        title: `${config.appName} docs`,
        version: '0.0.1',
      },
    },
    apis: ['./src/**/*.js', './src/docs/*.jsdoc'], // Path to the API docs
  };

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(options);
  res.json(swaggerSpec);
});

module.exports = (app) => {
  app.use('/swagger/docs/api.json', router);
};
