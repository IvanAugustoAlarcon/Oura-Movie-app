import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMovies, reset } from '../features/movies/movieSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Main from '../components/Main'
import Row from '../components/Row'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { movies, isLoading, isError, message } = useSelector((state) => state.movie)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getMovies())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])


  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <Main />
      <Row rowID='1' category='Action' />
      <Row rowID='2' category='Animation' />
      <Row rowID='3' category='Horror' />
    </>
    
  )
}

export default Home
