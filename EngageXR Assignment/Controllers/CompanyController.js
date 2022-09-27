const express = require('express');
const app = express();

// Route to create a company
const createCompany = require('../routes/company/createCompany');
app.use('/createCompany', createCompany);

// Route to update company
const updateCompany = require('../routes/company/updateCompany');
app.use('/updateCompany', updateCompany);

// Route to get companies
const getCompanies = require('../routes/company/getCompanyDetails');
app.use('/getCompanies', getCompanies);

// Route to delete company
const deleteCompany = require('../routes/company/deleteCompany');
app.use('/deleteCompany', deleteCompany);

module.exports = app;