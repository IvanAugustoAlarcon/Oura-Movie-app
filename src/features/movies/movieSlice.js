import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieService from './movieService'

const initialState = {
    movies: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getMovies = createAsyncThunk('movie/getAll', async (_, thunkAPI) => {
    try {
      return await movieService.getMovies()
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

export const getMoviesByCategory = createAsyncThunk('movie/byCategory', async (category, thunkAPI) => {
  try {
    return await movieService.getMoviesByCategory(category)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const addMovie = createAsyncThunk('movie/addmovie', async (movieData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await movieService.addMovie(movieData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteMovie = createAsyncThunk('movie/deletemovie', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await movieService.deleteMovie(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateMovie = createAsyncThunk('movie/updateMovie', async (allData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    const id = allData[0]
    const movieData = allData[1]
    console.log('Si llegamos aqui', id, movieData, token)
    return await movieService.updateMovie(id, movieData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const movieSlice = createSlice({
    name:'movie',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.movies = action.payload
            })
            .addCase(getMovies.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getMoviesByCategory.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMoviesByCategory.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.movies = action.payload
            })
            .addCase(getMoviesByCategory.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(addMovie.pending, (state) => {
              state.isLoading = true
            })
            .addCase(addMovie.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.movies.push(action.payload) 
            })
            .addCase(addMovie.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteMovie.pending, (state) => {
              state.isLoading = true
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.movies =  action.payload
            })
            .addCase(deleteMovie.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateMovie.pending, (state) => {
              state.isLoading = true
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.movies =  action.payload
            })
            .addCase(updateMovie.rejected, (state, action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer