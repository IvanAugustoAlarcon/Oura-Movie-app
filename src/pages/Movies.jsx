import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getMovies, reset } from '../features/movies/movieSlice'
import { addLikedMovies } from '../features/favorites/favoritesSlice'
import { FaHeart } from 'react-icons/fa'
import Spinner from '../components/Spinner'

const Movies = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { movies, isLoading, isError, message } = useSelector((state) => state.movie)

    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
      dispatch(getMovies())

      return () => {
        dispatch(reset())
      }

    }, [isError, message, dispatch])
    
    const handleLike = (id) => {
        dispatch(addLikedMovies({movieId:id}))
        toast.success('Added to Favorites')
     
    }
    const handleMovieInfo = (id) => {
        navigate(`/movieinfo/${id}`)
    }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>

        <div className='bg-white/50 fixed top-0 w-full h-screen' />
        <div className=' py-24 lg:ml-[10rem] md:ml-[2rem]'>
              {movies?.map((movie) => (
                <>
                <div  className='w-[15rem] lg:w-[23rem] inline-block cursor-pointer relative p-4' key={movie._id}>
                    <img className='w-full h-full block object-cover rounded-md' src={`https://image.tmdb.org/t/p/w500/${movie?.image}`} alt={movie?.name} />
                    <button onClick={() => {handleLike(movie._id)}}>
                                <FaHeart className='absolute bottom-10 right-4 text-red-600 text-[1.5rem] hover:text-white' />                             
                    </button>
                    <div onClick={() => {handleMovieInfo(movie._id)}} className='absolute top-4 left-4 lg:w-[21rem] lg:h-[30rem] w-[13rem] h-[18rem] hover:bg-black/70 opacity-0 hover:opacity-100 text-white'>
                        <p className='white-space-normal text-xs md:text-sm lg:text-xl font-bold flex items-center justify-center  h-full text-center'>
                            {movie?.name}
                        </p>
                    </div>
                </div>
                </>
              ))}
        </div>
    </>
  )
}

export default Movies
