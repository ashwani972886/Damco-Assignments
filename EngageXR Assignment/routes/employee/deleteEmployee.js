const express = require('express');
const router = express.Router();
// Model
const Employee = require('../../models/employees');
// Middleware
const checkAuth = require('../../middleware/verifyAdmin');

router.delete('/:id', checkAuth, async (req, res) => {
    if(!req.params.id) {
        res.status(403).send({
            message: "Please enter a valid employee id!"
        });
    } else {
        const employee = await Employee.findOne({where: {id: req.params.id}});
        if(!employee) {
            res.status(403).send({
                message: "Employee not found for given id!"
            });
        } else {
            await employee.destroy({where: {id: req.params.id}});
            res.status(200).send({
                message: "Employee successfully deleted!"
            });
        }
    }
});

module.exports = router;