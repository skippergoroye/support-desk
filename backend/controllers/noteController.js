const asyncHandler = require('express-async-handler')


const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')


const getNotes = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    const ticket = await Ticket.findById(req.params.ticketId)
  
    if (ticket.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    const notes = await Note.find({ ticket: req.params.ticketId })
  
    res.status(200).json({
      message: 'Successful',
      notes,
    })
})



const addTicketNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {

    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    ticket: req.params.ticketId,
    isStaff: false,
    user: req.user.id,
  })

  res.status(200).json({
    message: 'Successful',
    note,
  })

})




module.exports = {
    getNotes,
    addTicketNotes
}