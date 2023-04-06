const asyncHandler = require('express-async-handler')



const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @desc   Get User tickets
// @route  GET /api/ticket
// @access Private

const getTickets = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'getTickets'})
})




// @desc   Create new ticket
// @route  POST /api/ticket
// @access Private

const createTicket = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'createTicket'})
})


module.exports = {
    getTickets,
    createTicket
}