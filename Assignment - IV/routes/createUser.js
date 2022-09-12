const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Model
const User = require('../models/user');

router.post('/', async (req, res) => {
    
    if(Object.keys(req.body).length === 0 || !req.body) {
        res.status(402).json({
            message: "Please fill valid data to create a new user"
        });
    } else {
        const users = await User.findOne({$or: [{email: req.body.email}, {mobile: req.bodymobile}]}).catch(err => res.status(404).send({message: "Not found!"}));
        if(users){
            res.status(409).send({message: "User already exists!"});
        } else {
            req.body._id = new mongoose.Types.ObjectId;
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                req.body.password = hash;
                const newUser = new User(req.body);
                newUser.save()
                .then(user => {
                    if(user) {
                        res.status(200).json({
                            message: "New user added successfully!",
                            result: user
                        });
                    }
                })
                .catch(err => {
                    res.status(402).json({
                        message: "Unable to create user!",
                        err: err
                    });
                });
            });

        }
    }


});

module.exports = router;