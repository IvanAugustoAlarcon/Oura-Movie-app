import axios from 'axios'

const API_URL = 'https://taupe-bream-shoe.cyclic.app/api/users/'

const getLikedMovies = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'favorites', config)
    return response.data
}

const addLikedMovies = async (movieId,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'favorites', movieId, config)
    return response.data
}

const removeLikedMovies = async (movieId,token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + 'favorites/delete', movieId, config)
    return response.data
}

const favoritesService = {
    getLikedMovies,
    addLikedMovies,
    removeLikedMovies
}
export default favoritesService