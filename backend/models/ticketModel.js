const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['iphone', 'Macbook Pro', 'iMac', 'ipad']
    },
    description: {
        type: String,
        required: [true, 'Please enter a descripion of the issue'],
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
        default: 'new'
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Ticket', ticketSchema)