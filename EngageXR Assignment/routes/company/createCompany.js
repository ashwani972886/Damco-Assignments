const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
// const sequelize = require('../../connection');
// Models
const Company = require('../../models/companies');
// Functions
const fun = require('../../functions');
// Middleware
const checkAuth = require('../../middleware/verifyAdmin');

router.post('/', [
    checkAuth,
    check('name', 'Please enter a valid Company name!')
    .exists()
    .isLength({min: 1}),
    check('email', 'Please enter valid company email address here!')
    .exists()
    .isEmail()
    .normalizeEmail(),
    check('phone', 'Please enter valid company phone number!')
    .isLength({min: 10, max: 10}),
], async (req, res) => {
    // const t = await sequelize.transaction();
    const error = validationResult(req);
    if(!error.isEmpty()) {
        res.status(401).send({
            message: "Unable to create Company!",
            err: error.errors
        });
    } else {
        req.body.name = fun.capitalize(req.body.name);
        try{
            const company = await Company.create(req.body);
            // const company = await Company.create(req.body, {
            //     transaction: t
            // });
            // t.commit();
            res.status(200).send({
                message: "New company created successfully!",
                result: company
            });
        } catch(err) {
            // t.rollback();
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
                message: "Unable to create Company!",
                err: messages
            });
        }

    }
});

module.exports = router;