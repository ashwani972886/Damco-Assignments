const express = require('express');
const router = express.Router();
// Models
const Company = require('../../models/companies');
const Employee = require('../../models/employees');
// Middleware
const checkAuth = require('../../middleware/verifyAdmin');

// Get all companies
router.get('/', checkAuth, async(req, res) => {
    const companies = await Company.findAll({
        include: [{
            model: Employee,
            as: 'employeeDetails'
        }]
    });
    if(companies.length < 1) {
        res.status(404).send({
            message: "No companies found!"
        });
    } else {
        res.status(200).send({
            message: "Listed Companies!",
            result: companies
        });
    }
});

// Get Company by id
router.get('/:id', checkAuth, async(req, res) => {
    if(!req.params.id) {
        res.status(403).send({
            message: "Please enter a valid company id!"
        });
    } else {
        const company = await Company.findOne({
            include: [{
                model: Employee,
                as: 'employeeDetails'
            }],
            where: {id: req.params.id}
        });
        if(!company) {
            res.status(403).send({
                message: "Company not found for given id!"
            });
        } else {
            res.status(200).send({
                message: "Listed company!",
                result: company
            });
        }
    }
});


module.exports = router;