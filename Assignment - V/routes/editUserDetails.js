const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
// Models
const User = require('../models/user');
// Middleware
const verifyUser = require('../middleware/verifyCreator');

router.put('/:email_phone', verifyUser, async (req, res) => {
    if(req.user.role === "Creater"){
        if(Object.keys(req.body).length === 0 || !req.body){
            res.status(406).send({message: "Please enter data to update!"});
        } else {
            const user = await User.findOne({where: {[Op.or]: [{email: req.params.email_phone}, {mobile: req.params.email_phone}]}}).catch(err => res.status(402).send({message: "Unable to find user!"}));
            if(!user){
                res.status(404).send({message: "Unable to find user with given details!"});
            } else {
                user.name = req.body.name;
                user.mobile = req.body.mobile;
                user.email = req.body.email;
                await user.save();
                res.status(200).send({message: "User details updated succesfully!"});
            }
        }
    } else {
        res.status(403).send({message: "Only creator can perform this action. Kindly please login with valid credentials"});
    }

});

module.exports = router;