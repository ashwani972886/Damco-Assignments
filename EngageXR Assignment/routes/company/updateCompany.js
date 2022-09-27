const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
// Models
const Company = require('../../models/companies');
// Functions
const fun = require('../../functions');
// Middleware
const checkAuth = require('../../middleware/verifyAdmin');

router.put('/:id', [
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
    if(!req.params.id) {
        res.status(403).send({
            message: "Please enter a valid company id!"
        });
    } else {
        const company = await Company.findOne({where: {id: req.params.id}});
        if(!company) {
            res.status(403).send({
                message: "Company not found for given id!"
            });
        } else {
            const error = validationResult(req);
            if(!error.isEmpty()) {
                res.status(401).send({
                    message: "Unable to create Company!",
                    err: error.errors
                });
            } else {
                req.body.name = fun.capitalize(req.body.name);
                if(
                    company.name === req.body.name && 
                    company.email === req.body.email && 
                    company.phone === req.body.phone && 
                    company.website === req.body.website){
                    res.status(409).send({
                        message: "No changes found for selected company!"
                    });
                } else{
                    try{
                        company.name = req.body.name;
                        company.email = req.body.email;
                        company.phone = req.body.phone;
                        company.website = req.body.website;
                        await company.save()   ;
                        res.status(200).send({
                            message: "Company details updated successfully!",
                            result: company
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
                            message: "Unable to update Company!",
                            err: messages
                        });
                    }
                }
            }
    
        }
    }
});

module.exports = router;