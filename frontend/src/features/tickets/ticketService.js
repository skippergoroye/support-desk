import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/tickets`

// Create New Ticket
const createTicket =  async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`        }
    }

    const response = await axios.post(BASE_URL, ticketData, config)
    return response.data
}



// Get User Ticket
const getTickets =  async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`        }
    }

    const response = await axios.get(BASE_URL, config)
    return response.data.tickets
}




// Get User Ticket
const getSingleTicket =  async ( id, token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`        }
    }

    const response = await axios.get(`${BASE_URL}/${id}`, config)
    return response.data
}



// close Ticket
const closeTicket =  async ( id, token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`        }
    }

    const response = await axios.put(`${BASE_URL}/${id}`, { status: 'closed' }, config)
    return response.data
}



const ticketService = {
    createTicket,
    getTickets,
    getSingleTicket,
    closeTicket
}


export default ticketService