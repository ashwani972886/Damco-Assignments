const express = require('express');
const router = express.Router();
// Model
const Company = require('../../models/companies');
// Middleware
const checkAuth = require('../../middleware/verifyAdmin');

router.delete('/:id', checkAuth, async (req, res) => {
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
            await company.destroy({where: {id: req.params.id}});
            res.status(200).send({
                message: "Company successfully deleted!"
            });
        }
    }
});

module.exports = router;