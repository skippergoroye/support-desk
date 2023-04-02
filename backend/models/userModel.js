const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false, 
    }
},
    {
        timestamps: true,
    }
)

// const User = mongoose.model('User', userSchema)
// module.exports = User


module.exports = mongoose.model('User', userSchema)