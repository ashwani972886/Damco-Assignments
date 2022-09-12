const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());

/* Enter Base_URL as below to run this code:
    BASE_URL = http://localhost:3000/assignments/{endpoint of task from tasks.jsit}
*/
// Route to check connection to server
app.get('/', (req, res) => {
    res.send("Welcome, connected to server on port 3000!")
});

// Route to switch between assignments
const assignmentRoute = require('./assignment');

app.use('/assignments', assignmentRoute);

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