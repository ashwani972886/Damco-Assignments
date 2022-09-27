const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

module.exports = async (req, res, next) => {
    try{
        if(!req.headers.token) {
            res.status(409).send({
                message: "Please enter a valid token!"
            });
        } else {
            const verify = jwt.verify(req.headers.token, secretKey);
            if(verify) {
                const token = jwt.decode(req.headers.token);
                if(token.role === "Admin") {
                    next();
                } else {
                    res.status(403).send({message: "Please login valid admin credentials!"});
                }
            }
        }
    } catch (err) {
        res.status(403).send({message: "Unable to verify user! Please login again!", error: err});
    }
};