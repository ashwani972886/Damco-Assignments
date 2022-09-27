const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/CRUD");

mongoose.connection.on('connected', (err) => {
    if(err) {
        console.log("Unable to connect to mongoDB database!");
    } else {
        console.log("Successfully connected to mongoDB database");
    }
});