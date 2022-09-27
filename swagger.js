const { INTEGER } = require('sequelize');
const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger_output.json';

const endpointsFiles = ['./EngageXR Assignment/main.js'];

const doc = {
    info: {
        version: '1.0.0',
        title: "EngageXR API",
        description: "EngageXR API  documentation"
    },
    host: 'localhost:3000',
    basePath: '/assignments/engageXR',
    schemes: [
        'http',
        'https'
    ]
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js');
});