const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {jwtSecret} = require("../config/config")

const jwtVerify = async(req, res, next)=>{
    try {
        const token = req.cookies.jwtToken;
      
        const verifyJwt = jwt.verify(token, jwtSecret);
        const user = await User.findById(verifyJwt._id);
        if(!user){
            return res.status(404).send("Invalid Token")
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({message: "Please Authenticate"});
    }
}

module.exports = jwtVerify;