const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
// Models
const Company = require('../../models/companies');
const Employee = require('../../models/employees');
// Functions
const fun = require('../../functions');
// Middleware
const checkAuth = require('../../middleware/verifyAdmin');

router.put('/:id', [
    checkAuth,
    check('firstName', 'Please enter a valid first name!')
    .exists()
    .isLength({min: 1}),
    check('lastName', 'Please enter a valid last name!')
    .exists()
    .isLength({min: 1}),
    check('company', 'Please select a valid company!')
    .exists()
    .isNumeric(),
    check('email', 'Please enter valid employee email address!')
    .exists()
    .isEmail()
    .normalizeEmail(),
    check('phone', 'Please enter valid employee phone number!')
    .isLength({min: 10, max: 10}),
], async (req, res) => {
    if(!req.params.id) {
        res.status(403).send({
            message: "Please enter a valid company id!"
        });
    } else {
        const employee = await Employee.findOne({where: {id: req.params.id}});
        if(!employee) {
            res.status(403).send({
                message: "Employee not found for given id!"
            });
        } else {
            const error = validationResult(req);
            if(!error.isEmpty()) {
                res.status(401).send({
                    message: "Unable to create Employee!",
                    err: error.errors
                });
            } else {
                try{
                    const company = await Company.findOne({where: {id: req.body.company}});
                    if(!company) {
                        res.status(406).send({
                            message: "Please select a valid company, selected company not found!"
                        });
                    } else {
                        req.body.firstName = fun.capitalize(req.body.firstName);
                        req.body.lastName = fun.capitalize(req.body.lastName);
                        if(
                            employee.firstName === req.body.firstName &&
                            employee.lastName === req.body.lastName &&
                            employee.company === req.body.company &&
                            employee.email === req.body.email &&
                            employee.phone === req.body.phone
                        ) {
                            res.status(409).send({
                                message: "No changes found for selected employee!"
                            });
                        } else {
                            employee.firstName = req.body.firstName;
                            employee.lastName = req.body.lastName;
                            employee.company = req.body.company;
                            employee.email = req.body.email;
                            employee.phone = req.body.phone;
                            await employee.save();
                            res.status(200).send({
                                message: "Employee details updated successfully!",
                                result: employee
                            });
                        }
                    }
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
                        message: "Unable to create Employee!",
                        err: messages
                    });
                }
        
            }

        }
    }
});

module.exports = router;