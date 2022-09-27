const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
// Models
const User = require('../../models/user');
// Functions
const fun = require('../../functions');

router.post('/', [
    check('name', 'Please enter a valid User name!')
    .exists()
    .isLength({min: 1}),
    check('email', 'Please enter valid  email address here!')
    .exists()
    .isEmail()
    .normalizeEmail(),
    check('password', 'Please enter a password with minimum 8 characters!')
    .exists()
    .isLength({min: 8}),
    check('phone', 'Please enter valid phone number!')
    .isLength({min: 10, max: 10}),
    check('role', 'Please select your role!')
    .exists()
], async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        res.status(401).send({
            message: "Unable to create user!",
            err: error.errors
        });
    } else {
        req.body.name = fun.capitalize(req.body.name);
        req.body.role = fun.capitalize(req.body.role);
        try{
            const hash = await bcrypt.hash(req.body.password, 10);
            req.body.password = hash;
            const user = await User.create(req.body);
            res.status(200).send({
                message: "New user created successfully!",
                result: user
            });
        } catch(err) {

            const messages = {};
            err.errors.forEach(error => {
                let message;
                switch(error.validatorKey){
                    case 'not_unique':
                        message = "Data already exists!";
                        break;
                }
                messages[error.path] = message;
            });
            res.status(401).send({
                message: "Unable to create user!",
                err: messages
            });
        }

    }
});

module.exports = router;