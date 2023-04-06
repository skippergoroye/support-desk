const express = require('express')

const { getTickets, getTicket, createTicket, updateTicket, deleteTicket } = require('../controller/ticketController')
const { protect } = require('../middleware/authMiddleware')




const router = express.Router()

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getTicket).put(protect, updateTicket).delete(protect, deleteTicket)


module.exports = router