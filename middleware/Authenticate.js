const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

const Authenticate = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const verifyToken =await jwt.verify(token, process.env.SECRET_KEY)
        // console.log(verifyToken);
        
        if(!verifyToken){
            res.status(401).json({error:"User Not Found",verifyToken})
        } else {
            const rootUser = await User.findOne({ _id: verifyToken._id})
            req.rootUser = rootUser;
            req.userID = rootUser._id
            
            next();
        }      
        
    } catch (err) {
        res.status(401).json({error:"Unauthorize: No token provided"})
    }
}

module.exports = Authenticate;