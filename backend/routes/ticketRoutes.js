const express = require('express')

const { getTickets, createTicket } = require('../controller/ticketController')
const { protect } = require('../middleware/authMiddleware')




const router = express.Router()

router.route('/').get(protect, getTickets).post(protect, createTicket)


module.exports = router