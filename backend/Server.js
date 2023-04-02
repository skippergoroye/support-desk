const express = require('express');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()


const PORT = process.env.PORT || 8000

const app = express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// Routes
app.get('/', (req, res) => {
    res.status(201).json({ message: "Welcome to the Support Desk Api"})
})

app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))