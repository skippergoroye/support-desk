const express =  require('express')
const { getNotes, addTicketNotes } = require('../controllers/noteController')
const { protect } = require('../middleware/authMiddleware')


const router = express.Router({ mergeParams : true })

router.route('/').get(protect, getNotes).post(protect, addTicketNotes)



module.exports = router