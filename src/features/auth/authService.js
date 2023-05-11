import axios from 'axios'

const API_URL = 'https://taupe-bream-shoe.cyclic.app/api/users/'

const registerUser = async (userData) => {
    const response = await axios.post(API_URL, userData)
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    registerUser,
    login,
    logout
}
export default authService