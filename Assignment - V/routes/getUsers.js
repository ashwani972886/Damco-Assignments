const express = require('express');
const router = express.Router();
// Model
const User = require('../models/user');

router.get('/', async (req, res) => {

    const user = await User.findAll().catch(err => res.status(402).send({message: "Unable to get users!"}));
    if(user.length < 1) {
        res.status(404).send({message: "No users found!"});
    } else {
        res.status(200).json({
            message: "Users found!",
            result: user
        });
    }
});

module.exports = router;