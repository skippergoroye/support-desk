const asyncHandler = require('express-async-handler')
// @desc Register a new user
// @route /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    //Validation
    if(!name || !email || !password) {
        return res.status(400)
        throw new Error('Please include all fields')
    }




    //console.log(req.body)
    res.send("Register User")
})






// @desc Login user
// @route /api/users/logic
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    res.send("Login User")
})


module.exports = {
    registerUser,
    loginUser,
}