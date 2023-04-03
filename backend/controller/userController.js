const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');






// @desc Register a new user
// @route /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // Validation
    if(!name || !email || !password) {
        return res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if user already exist
    const userExists = await User.findOne({ email : email })

    if(userExists) {
        res.status(400)
        throw new Error('User Already Exist')
    }


    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    return  res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    })

    // if(user){
        // res.status(201).json({
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        // })
    // } else {
    //     res.status(400)
    //     throw new error('Invalid user data')
    // }
})










// @desc Login user
// @route /api/users/logic
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body


    // Check if user exist
    const user = await User.findOne({ email: email })


    if(!user){
        throw new Error("User does not exist kindly register")
    }
    

    // Check if user and password match
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            message: "Login successfull",
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error("Invalid credentials")
    }
})




// @desc Get ME
// @route /api/users/me
// @access Private

const getMe = asyncHandler(async (req, res) => {
    res.send('me')
    console.log(error)
})




const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}