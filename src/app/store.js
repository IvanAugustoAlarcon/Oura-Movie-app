import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import movieReducer from '../features/movies/movieSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
    favorites: favoritesReducer
  }
})
