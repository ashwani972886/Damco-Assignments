const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
// Models
const User = require('../models/user');

router.post('/', async (req, res) => {

    if(Object.keys(req.body).length === 0 || !req.body){
        res.status(402).send({message: "Please enter some valid data!"});
    } else {
        const users = await User.findOne({where: {[Op.or]: [{email: req.body.email}, {mobile: req.body.mobile}]}});
        if(users) {
            res.status(409).send({message: "User already exists!"});
        } else {
            const hash = await bcrypt.hash(req.body.password, 10);
            req.body.password = hash;
            User.create(req.body).then((user) => {
                res.status(200).json({
                    message: "User created succesfully!",
                    result: user
                });
            })
            .catch((err) => {
                res.status(401).send({message: "Unable to create new user!"});
            });
        }
    }
});

module.exports = router;