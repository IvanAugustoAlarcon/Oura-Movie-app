import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addLikedMovies,getLikedMovies } from '../features/favorites/favoritesSlice'
import { getMoviesByCategory } from '../features/movies/MovieServicesAPI.js'
import { toast } from 'react-toastify'
import { FaHeart } from 'react-icons/fa'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Spinner from '../components/Spinner'

const Row = ({category, rowID}) => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    getMoviesByCategory(category.toLowerCase()).then((data) => {
      setMovies(data)
  })
    dispatch(getLikedMovies())
  }, [category, dispatch])

  const slideLeft = () => {
    var slider = document.getElementById('slider' + rowID)
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = () => {
    var slider = document.getElementById('slider' + rowID)
    slider.scrollLeft = slider.scrollLeft + 500
  }

  const handleLike = (id) => {
      dispatch(addLikedMovies({movieId:id}))
      toast.success('Added to Favorites')
   
  }

  const handleMuvieInfo = (id) => {
    navigate(`/movieinfo/${id}`)
  }

  return (
    <>
        <h2 className='text-white font-bold md:text-xl p-5 mx-[3rem]'>{category}</h2>
        <div className='relative group sliders'>
            <MdChevronLeft onClick={slideLeft} className=' bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block lg:mx-[5rem]' size={40}/>
            <div id={'slider' + rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative lg:mx-[8rem] md:mx-[1rem] columns-3'>
                {movies.map((item, id) => (
                    <div className='w-[15rem] sm:w-[15rem] md:w-[15rem] lg:w-[25rem] inline-block cursor-pointer relative p-4' key={id}>
                        <div onClick={() => {handleLike(item._id)}}>
                                <FaHeart className='absolute top-4 text-gray-300' />                             
                            </div>
                        <img className='w-full h-[10rem] md:h-[10rem] sm:h-[10rem] lg:h-[15rem] block object-cover' src={`https://image.tmdb.org/t/p/w500/${item?.image}`} alt={item?.name} />
                        <div onClick={() => {handleMuvieInfo(item._id)}} className='absolute top-9 left-4 lg:w-[23rem] lg:h-[13rem] w-[13rem] h-[8rem] hover:bg-black/70 opacity-0 hover:opacity-100 text-white'>
                            <p className='white-space-normal text-xs md:text-sm font-bold flex items-center justify-center  h-full text-center'>
                                {item?.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <MdChevronRight onClick={slideRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block lg:mx-[5rem]' size={40}/>
        </div>
    </>
  )
}

export default Row