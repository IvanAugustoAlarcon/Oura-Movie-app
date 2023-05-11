import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Singup from '../pages/Singup'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import AddMovie from '../pages/AddMovie'
import Movies from '../pages/Movies'
import MovieInfo from '../pages/MovieInfo'
import WatchPage from '../pages/WatchPage'
import MovieUpdate from '../pages/MovieUpdate'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Singup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={ <Profile />} /> 
      <Route path='/profile/addmovie' element={<AddMovie />} />
      <Route path='/movies' element={<Movies/>} />
      <Route path='/movieinfo/:id' element={<MovieInfo/>} />
      <Route path='/watch/:id' element={<WatchPage />} />
      <Route path='/movieupdate/:id' element={<MovieUpdate />} />

    </Routes>
  )
}

export default RoutesIndex
