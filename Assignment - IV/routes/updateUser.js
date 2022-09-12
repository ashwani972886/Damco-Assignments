const express = require('express');
const router = express.Router();
// Model
const User = require('../models/user');

router.put('/:email_phone', async (req, res) => {

    if(Object.keys(req.body).length === 0 || !req.body) {
        res.status(402).json({
            message: "Please fill valid data to create a new user"
        });
    } else {
        const updatedUser = await User.findOneAndUpdate({$or: [{email: req.params.email_phone}, {mobile: req.params.email_phone}]}, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile
            }
        }).catch(err => res.status(402).send({message: "Unable to update users!"}));

        if(updatedUser) {
            res.status(200).send({message: "User details updated successfully!"});
        } else {
            res.status(401).send({message: "User not updated!"});
        }
    }
});

module.exports = router;