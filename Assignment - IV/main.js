const express = require('express');
const app = express();

// Connection to db
const db = require('./connection');

// Route to create a new user
const createUser = require('./routes/createUser');
app.use('/createUser', createUser);

// Route to get users
const getUsers = require('./routes/getUsers');
app.use('/getUsers', getUsers);

// Route to update user
const updateUser = require('./routes/updateUser');
app.use('/updateUser', updateUser);

// Route to delete user
const deleteUser = require('./routes/deleteUser');
app.use('/deleteUser', deleteUser);

module.exports = app;