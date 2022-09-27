const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
// Model
const User = require('../../models/user');

router.post('/', [
    check('userId', "Please enter your email or phone!")
    .exists(),
    check('password', "Please enter your password!")
    .exists()
], async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        res.status(401).send({
            message: "Unable to login!",
            err: error
        });
    } else {
        const user = await User.findOne({where: {[Op.or]: [{email: req.body.userId}, {phone: req.body.userId}]}});
        if(!user) {
            res.status(404).send({
                message: "User not found with given email or phone!",
            });
        } else {
            const validatePassword = await bcrypt.compare(req.body.password, user.password);
            if(!validatePassword) {
                res.status(403).send({
                    message: "Please enter correct password to login!"
                });
            } else {
                const token = jwt.sign({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }, secretKey);

                if(token) {
                    res.status(200).send({
                        message: "User logged in successfully!",
                        result: token
                    });
                } else {
                    res.status(403).send({
                        message: "Unable to generate token, please try again!"
                    });
                }
            }
        }
    }
});

module.exports = router;