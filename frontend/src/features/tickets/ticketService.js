import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL


const createTicket =  async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`        }
    }

    const response = await axios.post(`${BASE_URL}/api/tickets`, ticketData, config)
    return response.data
}



const ticketService = {
    createTicket,
}


export default ticketService