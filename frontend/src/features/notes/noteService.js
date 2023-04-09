import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/api/tickets`




// Get Ticket Note
const getNotes =  async ( id, token ) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`        }
    }

const response = await axios.get(`${BASE_URL}/${id}/notes`, config)
    return response.data.notes
}



const noteService = {
    getNotes
}


export default noteService