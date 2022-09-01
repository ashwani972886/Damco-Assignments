const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

// Get data from https://jsonplaceholder.typicode.com/users and save it in new json file
router.get('/fetchData', async(req, res) => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/users");
    
    // Converting data from object to string
   let user = JSON.stringify(data.data);
    
   // Writing data to a new file
    fs.writeFile("Assignment-I/users.json", user,  err => {
        if(err) throw err;
        res.status(200).json({
            statusCode: res.statusCode,
            message: "Users written in file successfully!"
        });
    });
});

// Tasks
// 1. change the name to Ashwani Goyal wherever u find leanne graham

router.get('/updateName',  (req, res) => {
    fs.readFile('Assignment-I/users.json', (err, users) => {
        if(err) {
            throw err;
        } else {

            // Converting data from string  to JSON
            let userList = JSON.parse(users);

            // Updating name using map method
            let newUserList = userList.map(user => {
                if(user.name === "Leanne Graham"){
                    user.name = "Ashwani Goyal"
                }
                return user;
            });

        // Converting data from JSON to string
           newUserList =  JSON.stringify(newUserList);
            fs.writeFile("Assignment-I/users.json", newUserList, err => {
                if(err) throw err;
                res.status(200).json({
                    statusCode: res.statusCode,
                    message: "Users update in file successfully!"
                });
            });
        }
    });
});

// 2.  do the samethg to city also if u find same cityname then replace that with Faridabad
router.get("/updateCity", (req, res) => {

    fs.readFile('Assignment-I/users.json', (err, users) => {
        if(err) {
            throw err;
        } else {

            // Converting data from string  to JSON
            let userList = JSON.parse(users);

            // Updating name using map method
            let newUserList = userList.map(user => {
                if(user.name === "Ashwani Goyal" && user.address.city !== "Faridabad"){
                    user.address.city = "Faridabad"
                }
                return user;
            });

        // Converting data from JSON to string
           newUserList =  JSON.stringify(newUserList);
            fs.writeFile("Assignment-I/users.json", newUserList, err => {
                if(err) throw err;
                res.status(200).json({
                    statusCode: res.statusCode,
                    message: "City updated in file successfully!"
                });
            });
        }
    });

});

// 3.Put even ids in one array & odd ids in other array
router.get('/filterData', (req, res) => {

    fs.readFile('Assignment-I/users.json', (err, users) => {
        if(err){
            throw err;
        } else {
            
            // Converting data from string  to JSON
            let userList = JSON.parse(users);

            // Filtering Arrays using filter method
            const evenArray = userList.filter(user => {
                return user.id  % 2 == 0;
            });
            const oddArray = userList.filter(user => {
                return user.id % 2 != 0;
            });
        
            res.status(200).json({
                statusCode: res.statusCode,
                message: "Data filtered successfully!",
                result: {
                    evenArray: evenArray,
                    oddArray: oddArray
                }
            });

        }   
    });
});

// 4.get the name and phone number and join with comma
router.get('/joinNameAndNumber', (req, res) => {

    fs.readFile('Assignment-I/users.json', (err, users) => {
        if(err){
            throw err;
        } else {
            // Converting data from string  to JSON
            let userList = JSON.parse(users);
            // Fetch name and mobile number from each user and joined them
            const joinData = userList.map(users => {
                let name = users.name;
                let phoneNumber = users.phone;
                return name +", " + phoneNumber;
            });

            res.status(200).json({
                statusCode: res.statusCode,
                message: "Name and phone numbers joined!",
                result: joinData
            });

        }
    });
});

// 5.post a user at end and starting of array
router.get('/addData',  (req, res) => {
    fs.readFile('Assignment-I/users.json', (err, users) => {
        if(err) {
            throw err;
        } else {

            // Converting data from string  to JSON
            let userList = JSON.parse(users);

            // declaring two new users
            // User 1
            let user1 = {
                "id": 11,
                "name": "Michael",
                "username": "ABC",
                "email": "ABC@march.biz",
                "address": {
                  "street": "Light Street",
                  "suite": "Apt. 224",
                  "city": "Delhi",
                  "zipcode": "92898-3974",
                  "geo": { "lat": "-37.4159", "lng": "82.1496" }
                },
                "phone": "1-770-736-8132 x56442",
                "website": "hildegard.com",
                "company": {
                  "name": "Romaguera-Crona-etc",
                  "catchPhrase": "Multi-layered client-server neural-net-tower",
                  "bs": "harness real-time e-markets-up"
                }
            };
            // User 2
            let user2 = {
                "id": 0,
                "name": "David",
                "username": "DEF",
                "email": "def@march.net",
                "address": {
                  "street": "Brett",
                  "suite": "Apt. 122",
                  "city": "Palwal",
                  "zipcode": "92568-3874",
                  "geo": { "lat": "-37.3269", "lng": "81.1596" }
                },
                "phone": "1-770-787-8031 x56442",
                "website": "faaltu.org",
                "company": {
                  "name": "Romaguera-Crona-times",
                  "catchPhrase": "Multi-layered-building client-server neural-net",
                  "bs": "harness real-time e-markets extra time"
                }
            };

            // Inserting data into array;
            userList.push(user1); //At the end of the array
            userList.unshift(user2); // At the beginning of array

            // Converting data from JSON to string
           userList =  JSON.stringify(userList);

            // Writing new data to file
            fs.writeFile('Assignment-I/users.json', userList, err => {
                if(err) throw err;
                res.status(200).json({
                    statusCode: res.statusCode,
                    message: "Two new users inserted successfully"
                });
            });
        }
    });
});

// 6.Check whether street Victor Plains is present or not.(shouldnot use find method
router.get('/findVictorPlains', (req, res) => {
    fs.readFile('Assignment-I/users.json', (err, users) => {
        if(err){
            throw err;
        } else {
            // Converting data from string  to JSON
            const userList = JSON.parse(users);
            // Declare a boolean variable flag
            let flag = 0;
            
            // Finding Victor Plains street in data
            for(let i = 0; i < userList.length; i++) {
                if(userList[i].address.street === "Victor Plains") {
                    flag = 1;
                    break;
                }
            }

            // Sending response
            if(flag) {
                res.status(200).json({
                    statusCode: res.statusCode,
                    message: "Victor Plains found as a street in given data!"
                });
            } else {
                res.send("Victor Plains not found!");
            }
        }
    });    
});

// 7.Add company name after username key
router.get('/addCompanyName', (req, res) => {
    fs.readFile('Assignment-I/users.json', (err, users) => {
        if(err) {
            throw err;
        } else {
            
            // Converting data from string  to JSON
            const userList = JSON.parse(users);

            // Adding company name after username using map method
            const newUserList = userList.map(user => {

                const data = {
                    "id": user.id,
                    "name": user.name,
                    "username": user.username,
                    "companyname": user.company.name,
                    "email": user.email,
                    "address": user.address,
                    "phone": user.phone,
                    "website": user.website,
                    "company": user.company
                };

                return data;
            });

            // Sending modified data to response
            res.status(200).json({
                statusCode: res.statusCode,
                message: "Combined username and company name successfully!",
                result: newUserList
            });
        }
    });
});

module.exports = router;