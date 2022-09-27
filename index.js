const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

app.use(express.json());
app.use(bodyParser.json());

/* Enter Base_URL as below to run this code:
    BASE_URL = http://localhost:3000/assignments/{endpoint of task from tasks.js}
*/

// // Swagger Options
// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: 'EngageXR API',
//             version: '1.0.0'
//         },
//         servers: [{url: 'http://localhost:3000/assignments/engageXR/'}]
//     },
//     apis: ['./index.js'],
// };

// Generate swagger docs
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// // /**
// //  * @swagger
// //  * /:
// //  *  get:
// //  *      summary: Check swagger
// //  *      description: Working or not
// //  *      responses: 
// //  *          200:
// //  *              description: Working
// //  */

// /**
//  * @swagger
//  * definitions:
//  *     Company:
//  *         type: object
//  *         properties:
//  *             id:
//  *                 type: integer
//  *                 description: Id of the company (auto-generated)
//  *                 example: 1
//  *             name:
//  *                 type: string
//  *                 description: Name of the company
//  *                 example: ABC Corporation
//  *             email:
//  *                 type: string
//  *                 description: Email address of company
//  *                 example: abccorp@gmail.com
//  *             phone:
//  *                 type: string
//  *                 description: Contact number of Company
//  *                 example: 1234567890
//  *             website:
//  *                 type: string
//  *                 description: Website of the company
//  *                 example: abccorp.com
//  */

// /**
//  * @swagger
//  * /assignments/engageXR/company/createCompany:
//  * post:
//  *      summary: Create a new company
//  *      description: Create a new company
//  *      requestBody:
//  *              required: true
//  *              content:
//  *                      application/json:
//  *                          schema:
//  *                              type: object
//  *                              items:
//  *                                  $ref: '#defiinitions/Company'
//  *      responses:
//  *          200:
//  *              description: Company created successfully!
//  */

// /**
//  * @swagger
//  * /assignments/engageXR/company/getCompanies:
//  *  get:
//  *      summary: To get all the companies
//  *      description: To get all the companies
//  *      responses:
//  *          200:
//  *              description: Listed Companies!
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: array
//  *                          items:
//  *                              $ref: '#definitions/Company'
//  *          404:
//  *              description: No companies found!
//  */

// Route to check connection to server
app.get('/', (req, res) => {
    res.send("Welcome, connected to server on port 3000!")
});

// Route to switch between assignments
const assignmentRoute = require('./assignment');
app.use('/assignments', assignmentRoute);

// Error response when route not found
app.use((req, res) => {
    res.status(404).json({
        statusCode: res.statusCode,
        message: "Page not found!"
    });
});

// Start the server
app.listen(3000, (error) => {
    if(error) throw error;
    console.log("Server running at port 3000!!");
});