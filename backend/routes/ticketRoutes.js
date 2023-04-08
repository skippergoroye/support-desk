const express = require('express')

const { getTickets, getTicket, createTicket, updateTicket, deleteTicket } = require('../controllers/ticketController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()


// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)


router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getTicket).put(protect, updateTicket).delete(protect, deleteTicket)


module.exports = router