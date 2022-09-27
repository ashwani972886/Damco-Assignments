const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Models
const User = require('../models/user');

router.get('/', async (req, res) => {

    if(Object.keys(req.body).length === 0 || !req.body){
        res.status(403).send({message: "Please enter valid data to login!"});
    } else {
        const user = await User.findOne({where: {[Op.or]: [{email: req.body.email_phone}, {mobile: req.body.email_phone}]}}).catch(err => res.status(402).send({message: "Unable to fetch user!"}));
        if(!user) {
            res.status(404).send({message: "No user found with these details. Please register first!"});
        } else {
            const verifyCredentials = await bcrypt.compare(req.body.password, user.password);
            if(!verifyCredentials) {
                res.status(403).send({message: "Please enter correct password!"});
            } else {
                const token = jwt.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    gender: user.gender,
                    role: user.role
                },
                'integrateJWT', {
                    expiresIn: '600000'
                });

                res.status(200).send({message: "Successfully Logged In!", result: token});
            }
        }
    }

});

module.exports = router;