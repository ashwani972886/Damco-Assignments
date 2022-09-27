const express = require('express');
const app = express();

// Route to Assignment-I
const assignment1Route = require('./Assignment-I/tasks');
app.use('/1', assignment1Route);

// Route to Assignment-II & III
const assignment2Route = require('./Assignment-II & III/main');
app.use('/2', assignment2Route);

// Route to Assignment - IV
const assignment4Route = require('./Assignment - IV/main');
app.use('/4', assignment4Route);

// Route to Assignment - V
const assignment5Route = require('./Assignment - V/main');
app.use('/5', assignment5Route);

// Route to EngageXR Assignment
const engageRoute = require('./EngageXR Assignment/main');
app.use('/engageXR', engageRoute);


module.exports = app;