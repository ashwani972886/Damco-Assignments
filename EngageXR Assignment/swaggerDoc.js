const express = require('express');
const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger Options
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'EngageXR API',
            version: '1.0.0'
        },
        servers: [{url: 'http://localhost:3000/assignments/engageXR/'}]
    },
    apis: ['./swaggerDoc.js'],
};

// Generate swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /assignments/engageXR/company/getCompanies:
 *  get:
 *      summary: To get all the companies
 *      description: To get all the companies
 *      responses:
 *          200:
 *              description: Listed Companies!
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/company'
 */

module.exports = app;