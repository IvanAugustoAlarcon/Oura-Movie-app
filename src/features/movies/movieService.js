import axios from 'axios'

const API_URL = 'https://taupe-bream-shoe.cyclic.app/api'

const getMovies = async () => {
    const response = await axios.get(API_URL + `/movies`)
    return response.data.movies
}

const getMoviesByCategory = async (category) => {
    const response = await axios.get(API_URL + `/movies?category=${category}`)
    return response.data
}

const addMovie = async (movieData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + '/movies/', movieData, config)
    return response.data
}

const deleteMovie = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + '/movies/' + id, config)
    return response.data
}

const updateMovie = async (id, movieData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + '/movies/' + id, movieData, config)
    console.log(response.data)
    return response.data
}

const movieService = {
    getMovies,
    getMoviesByCategory,
    addMovie,
    deleteMovie,
    updateMovie
}
export default movieService
