import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { deleteMovie } from '../features/movies/movieSlice'
import { addLikedMovies } from '../features/favorites/favoritesSlice'
import { getMoviesById } from '../features/movies/MovieServicesAPI'
import { FaHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

const MovieInfo = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [movieInfo, setMovieInfo] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const { user } = useSelector((state) => state.auth) 

    useEffect(() => {
        setIsLoading(true)
        getMoviesById(id).then((data) => {
            setMovieInfo(data)
            setIsLoading(false)
        })
      }, [id])

    const handleLike = (id) => {
        dispatch(addLikedMovies({movieId:id}))
        toast.success('Added to Favorites')
     
    }

    const handleDelete = (id) => {
        if(confirm('This movie will be delete, Do you want to continue?') === true){
            dispatch(deleteMovie(id))
            navigate('/movies')
        }
    }

    const Loading = () => {
        return (
            <Spinner />
        )
    }

    const ShowInfo = () => {
        return (
            <>
                <div className=' py-24'>
                    <div className='container px-3 lg:mx-[10rem] sm:mx-3 2xl:px-5 xl:grid grid-cols-3 flex-col0 py-10 lg:py-20 gap-[2rem]'>
                        <div className='xl:col-span-1 w-[25rem] xl:order-none order-last h-[40rem] border border-gray-800 rounded-lg overflow-hidden'>
                            <img src={`https://image.tmdb.org/t/p/w500/${movieInfo?.image}`} className='w-full h-full'/>
                        </div>
                        <div className='col-span-2 md:grid grid-cols-5 gap-4 items-center'>
                            <div className='col-span-3 flex flex-col gap-10'>
                                <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold text-white'>
                                    {movieInfo?.name}
                                </h1>
                                <div className='flex item-center gap-4 font-medium text-gray-200'>
                                    <div className='bg-red-600 text-xs px-2 py-1'>
                                        HD 4K
                                    </div>
                                    <div className='text-xs px-2 py-1 text-white'>
                                        <i className='uil uil-calendar-alt'/> {movieInfo.year}
                                    </div>
                                    <div className='text-xs px-2 py-1 text-white'>
                                        <i className='uil uil-hourglass'/> {movieInfo.time} min
                                    </div>
                                </div>
                                <p className='text-gray-200 text-lg leading-7'>{movieInfo?.desc}</p>
                                <div className='grid sm:grid-cols-5 grid-cols-2 gap-4 p-6 border border-gray-800 rounded-lg'>
                                    
                                    <div onClick={() => {handleLike(movieInfo._id)}} className='sm:col-span-1 col-span-2 flex content-center  font-medium text-sm text-white item__center'>
                                        <button className='bg-black hover:bg-red-600  border-2 rounded-md border-red-500  flex-rows gap-3 w-[4rem] sm:py-3 flex justify-center'>
                                            <FaHeart className='text-gray-300' />
                                        </button>
                                    </div>

                                    <div className='col-span-2 font-medium text-sm content-center item__center'>
                                        <p className='text-white'>Languege:  {' '} <span className='ml-2 truncate'>{movieInfo?.language}</span></p>
                                    </div>
                                    <div className='sm:col-span-2 col-span-2 flex content-center  font-medium text-sm text-white'>
                                        <Link to={`/watch/${movieInfo?._id}`} className='bg-black hover:bg-red-600 transitions border-2 border-red-500 rounded-full flex-rows gap-4 w-full sm:py-3 flex justify-center'>
                                            <i className='uil uil-play'/>Watch
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {user.isAdmin ? (
                                <>
                                    <div className='col-span-2 md:mt-0 flex justify-start flex-col lg:ml-[5rem] ml-0'>
                                        <button onClick={() => {handleDelete(movieInfo._id)}} className='md:w-[10rem] w-full relative bg-red-600 hover:bg-transparent border-2 border-red-600 transitions md:h-10 h-10 font-medium rounded-md text-white mb-3'>
                                            Delete Movie 
                                        </button>
                                        <Link to={`/movieupdate/${movieInfo?._id}`} className='md:w-[10rem] w-full relative bg-red-600 hover:bg-transparent border-2 border-red-600 transitions md:h-10 h-10 font-medium rounded-md text-white flex justify-center'>
                                            <p className='item__center'>Update Movie</p> 
                                        </Link>
                                    </div>
                                </>
                            ) : (null)}
                            
                        </div>
                    </div>
                </div>
            </>
        )
    }  
  return (
    <>
        {isLoading ? <Loading /> : <ShowInfo />}
    </>
  )
}

export default MovieInfo