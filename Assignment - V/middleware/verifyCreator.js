const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try{
        if(req.headers.token){

            const token = req.headers.token;
            const verify = jwt.verify(token, 'integrateJWT');
            if(verify){
                console.log(verify);
                const decodedToken = jwt.decode(token);
                if(decodedToken.role === "Creater"){
                    req.user = verify;
                    next();
                } else {
                    res.status(403).send({message: "Only creator can perform this action. Kindly please login with valid credentials"});
                }
            }
        }

    } catch(err){
        res.status(403).send({message: "Unable to verify user! Please login again!", error: err});
    }

};