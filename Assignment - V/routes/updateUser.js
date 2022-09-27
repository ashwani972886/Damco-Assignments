const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
// Models
const User = require('../models/user');

router.put('/:email_phone', async (req, res) => {

    if(Object.keys(req.body).length === 0 || !req.body) {
        res.status(402).send({message: "Please enter valid data!"});
    } else  if(!req.params.email_phone){
        res.status(403).send({message: "Please enter a valid email address or phone number"});
    } else {
        const user = await User.findOne({where: {[Op.or]: [{email: req.params.email_phone}, {mobile: req.params.email_phone}]}}).catch(err => res.status(404).send({message: "No user found with given details!"}));
        if(!user) {
            res.status(404).send({message: "No user found with given details!"});
        } else {
            user.name = req.body.name;
            user.email = req.body.email;
            user.mobile = req.body.mobile;
            await user.save();
            res.status(200).send({message: "Details updated successfully!"});
        }
    }
});

module.exports = router;