import axios from 'axios'
const API_URL = 'https://taupe-bream-shoe.cyclic.app/api'

const getMoviesByCategory = async (category) => {
  try {
    const response = await axios.get(API_URL + `/movies?category=${category}`)
    return response.data.movies
  } catch (error) {
    console.log('error')
  }
}

const getMoviesById = async (id) => {
  try {
    const response = await axios.get(API_URL + `/movies/${id}`)
    return response.data
  } catch (error) {
    console.log('error')
  }
}

export { getMoviesByCategory, getMoviesById }
