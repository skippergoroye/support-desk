const asyncHandler = require('express-async-handler')



const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @desc   Get User tickets
// @route  GET /api/ticket
// @access Private

const getTickets = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user =  await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json({ tickets }) // res.data.tickets
    res.status(200).json(tickets)     // res.data
})



// @desc   Get User ticket
// @route  GET /api/tickets/:id
// @access Private

const getTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user =  await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }


    // Allow inly authorized user to access this route
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized")
    }

    await ticket.remove()

    res.status(200).json(ticket)
})




// @desc   Create new ticket
// @route  POST /api/ticket
// @access Private

const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    if(!product || !description){
        res.status(400)
        throw new Error('please add a product and description')
    }

    // Get user using the id in the JWT
    const user =  await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }


    const tickect = await Ticket.create({
        product, 
        description,
        user: req.user.id,
        status: 'new',
    })

    res.status(201).json(tickect)
})



// @desc   Update ticket
// @route  PUT /api/tickets/:id
// @access Private

const updateTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }


    // Allow inly authorized user to access this route
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new : true})
    res.status(200).json(updatedTicket)
})







// @desc   Delete ticket
// @route  DELETE /api/tickets/:id
// @access Private

const deleteTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }


    // Allow inly authorized user to access this route
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("Not Authorized")
    }
    
    await ticket.deleteOne()
    res.status(200).json({ message: "Ticket deleted" })
})


module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
}