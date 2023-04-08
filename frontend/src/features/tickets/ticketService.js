import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL

// Create New Ticket
const createTicket =  async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`        }
    }

    const response = await axios.post(`${BASE_URL}/api/tickets`, ticketData, config)
    return response.data
}



// Get User Ticket
const getTickets =  async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`        }
    }

    const response = await axios.get(`${BASE_URL}/api/tickets`, config)
    return response.data.tickets
}



const ticketService = {
    createTicket,
    getTickets
}


export default ticketService