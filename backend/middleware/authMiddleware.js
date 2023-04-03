const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');




const protect = asyncHandler(async (req, res, next) => {
    // let token 

    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     try {
    //        // Get Token from header
    //        token = req.headers.authorization.split(' ')[1]

    //        // Verify Token
    //        const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //        // Get user from token
    //        req.user = await User.findById(decoded.id).select('-password')
    //     } catch (error) {
    //        console.log(error)
    //        res.status(401)
    //        throw new Error("Not Authorized")
    //     }
    // }

    // if(!token) {
    //     res.status(401)
    //     throw new Error("Not Authorized")
    // }


    const token = req.headers.authorization;
    if(token && token.startsWith('Bearer')){
        try {
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Unauthorized, token failed')
        }
    }else if(!token){
        res.status(401).json({
            Error: "Unauthorized, no token"
        })
    }
    next()
})



module.exports = { protect }