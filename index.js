const express = require('express');
const app = express();

app.use(express.json());

/* Enter Base_URL as below to run this code:
    BASE_URL = http://localhost:3000/assignment-I/{endpoint of task from tasks.jsit}
*/


// Route to check connection to server
app.get('/', (req, res) => {
    res.send("Welcome, connected to server on port 3000!")
});

const assignment1Route = require('./Assignment-I/tasks');

app.use('/assignment1', assignment1Route);

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