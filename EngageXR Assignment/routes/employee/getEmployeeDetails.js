const express = require('express');
const router = express.Router();
// Models
const Company = require('../../models/companies');
const Employee = require('../../models/employees');
// Middleware
const checkAuth = require('../../middleware/verifyAdmin');

// Get all employees
router.get('/', checkAuth, async (req, res) => {
    const employees = await Employee.findAll({
        include: [{
            model: Company,
            as: 'companyDetails'
        }]
    });
    if(employees.length < 1) {
        res.status(404).send({
            message: "No employees found!"
        });
    } else {
        res.status(200).send({
            message: "Listed Employees!",
            result: employees
        });
    }
});

// Get Employee by id
router.get('/:id', checkAuth, async(req, res) => {
    if(!req.params.id) {
        res.status(403).send({
            message: "Please enter a valid employee id!"
        });
    } else {
        const employee = await Employee.findOne({
            include: [{
                model: Company,
                as: 'companyDetails'
            }],
            where: {id: req.params.id}
        });
        if(!employee) {
            res.status(403).send({
                message: "Employee not found for given id!"
            });
        } else {
            res.status(200).send({
                message: "Listed employee!",
                result: employee
            });
        }
    }
});

module.exports = router;