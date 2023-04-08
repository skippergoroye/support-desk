import axios from 'axios';


const BASE_URL = process.env.REACT_APP_BASE_URL



// Register User
const register = async (userData) => {
    const response = await axios.post(`${BASE_URL}/api/users`, userData)
    

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data
}





// Login User
const login = async (userData) => {
    const response = await axios.post(`${BASE_URL}/api/users/login`, userData)


    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}



// Logout User
const logout = async () => localStorage.removeItem('user')



const authService = {
    register, 
    login,
    logout
}


export default authService