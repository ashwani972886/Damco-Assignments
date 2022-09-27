const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
// Model
const User = require('../models/user');

router.delete('/:email_phone', async (req, res) => {

    if(!req.params.email_phone) {
        res.status(403).send({message: "Please enter valid email address or phone number!"});
    } else {
        const user = await User.findOne({where: {[Op.or]: [{email: req.params.email_phone}, {mobile: req.params.email_phone}]}}).catch(err => res.status(401).send({message: "Unable to find details!"}));
        if(!user){
            res.status(404).send({message: "Unable to find user with given details!"});
        } else {
            await User.destroy({where: {[Op.or]: [{email: req.params.email_phone}, {mobile: req.params.email_phone}]}});
            res.status(200).send({message: "User deleted successfully!"});
        }
    }

});

module.exports = router;