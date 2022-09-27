const express = require('express');
const app = express();

// Route to create employees
const createEmployee = require('../routes/employee/createEmployee');
app.use('/createEmployee', createEmployee);

// Route to update employee
const updateEmployee = require('../routes/employee/updateEmployee');
app.use('/updateEmployee', updateEmployee);

// Route to get employee details
const getEmployee = require('../routes/employee/getEmployeeDetails');
app.use('/getEmployees', getEmployee);

// Route to delete employee
const deleteEmployee = require('../routes/employee/deleteEmployee');
app.use('/deleteEmployee', deleteEmployee);

module.exports = app;