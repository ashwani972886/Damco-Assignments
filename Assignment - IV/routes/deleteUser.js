const express = require('express');
const router = express.Router();
// Model
const User = require('../models/user');

router.delete('/:email_phone', (req, res) => {
    User.deleteOne({$or: [{email: req.params.email_phone}, {mobile: req.params.email_phone}]})
    .then(deleted => {
        res.status(200).send({message: "User successfully deleted!"});
    }).catch(err => {
        res.status(402).send({message: "Unable to delete user!"});
    });
});

module.exports = router;