const express = require('express');
const app = express();

// Connection to database
const sequelize = require('./connection');

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

// Route to login user
const loginUser = require('./routes/loginUser');
app.use('/login', loginUser);

// Route to edit user details
const editUser = require('./routes/editUserDetails');
app.use('/editUserDetails', editUser);


module.exports = app;