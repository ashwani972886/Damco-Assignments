const express = require('express');
const app = express();

// Route to create a new user
const createUser = require('../routes/User/newUser');
app.use('/createUser', createUser);

// Route to login user
const loginUser = require('../routes/User/loginUser');
app.use('/loginUser', loginUser);

module.exports = app;