const express = require('express');
const app = express();
require('dotenv').config();
// const swagger = require('./swaggerDoc');

// Connection to database
const sequelize = require('./connection');

// app.use('/api-docs', swagger);
// Redirect to User Controller
app.use('/user',  require('./Controllers/UserController'));
// Redirect to Company Controller
app.use('/company',  require('./Controllers/CompanyController'));
// Redirect to Employee Controller
app.use('/employee',  require('./Controllers/EmployeeController'));

module.exports = app;