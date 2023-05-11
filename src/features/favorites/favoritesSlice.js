import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import favoritesService from './favoritesService'

const initialState = {
    favorites: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  }

export const getLikedMovies = createAsyncThunk('favorites/likedMovies', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await favoritesService.getLikedMovies(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const addLikedMovies = createAsyncThunk('favorites/addLikedMovies', async (movieId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favoritesService.addLikedMovies(movieId, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})
export const removeLikedMovies = createAsyncThunk('favorites/removeLikedMovies', async (movieId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await favoritesService.removeLikedMovies(movieId, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
      reset:(state) => initialState
    },
    extraReducers: (builder) => {
      builder
      .addCase(getLikedMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLikedMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favorites = action.payload
      })
      .addCase(getLikedMovies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.favorites = null
      })
      .addCase(addLikedMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addLikedMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favorites.push(action.payload)
      })
      .addCase(addLikedMovies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(removeLikedMovies.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeLikedMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favorites = state.favorites.filter((item) => item._id !== action.payload)
      })
      .addCase(removeLikedMovies.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
    }
})

export const { reset } = favoritesSlice.actions
export default favoritesSlice.reducer