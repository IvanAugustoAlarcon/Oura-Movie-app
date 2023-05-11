import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { getLikedMovies, removeLikedMovies, reset } from '../features/favorites/favoritesSlice'
import Spinner from './Spinner'

const Favorites = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { favorites, isLoading } = useSelector((state) => state.favorites)

  useEffect(() => {
    dispatch(getLikedMovies())

  },[dispatch])

  const slideLeft = () => {
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = () => {
    var slider = document.getElementById('slider' )
    slider.scrollLeft = slider.scrollLeft + 500
  }

  const handleLike = (id) => {
    dispatch(removeLikedMovies({movieId:id}))
    toast.error('Remove from Favorites')
    // window.location.reload()
}

const handleMuvieInfo = (id) => {
  navigate(`/movieinfo/${id}`)
}

if(isLoading){
  <Spinner />
}
 
  return (
    <>
        <h2 className='text-white font-bold md:text-xl p-5 mx-[3rem]'>Favorites</h2>
        <div className='relative group sliders'>
          {favorites.length === 0 ? (
            <div className='w-full flex justify-center'> 
              <h1 className='text-white lg:text-2xl'>You do not have any move added to favorites</h1>
            </div>): (
            <>
              <MdChevronLeft onClick={slideLeft} className=' bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block lg:mx-[5rem]' size={40}/>
              <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative lg:mx-[8rem] md:mx-[1rem] columns-3'>
                {favorites?.map((item, id) => (
                  <div className='w-[15rem] sm:w-[15rem] md:w-[15rem] lg:w-[25rem] inline-block cursor-pointer relative p-4' key={id}>
                        <div onClick={() => {handleLike(item._id)}} className='text__menu'>
                              <i className='uil uil-multiply absolute top-4 text-red bg-black'></i>
                        </div>
                        <img className='w-full h-[10rem] md:h-[10rem] sm:h-[10rem] lg:h-[15rem] block object-cover' src={`https://image.tmdb.org/t/p/w500/${item?.image}`} alt={item?.name} />
                        <div onClick={() => {handleMuvieInfo(item._id)}} className='absolute top-12 left-4 lg:w-[23rem] lg:h-[12rem] w-[13rem] h-[8rem] hover:bg-black/70 opacity-0 hover:opacity-100 text-white'>
                            <p className='white-space-normal text-xs md:text-sm font-bold flex items-center justify-center  h-full text-center'>
                                {item?.name}
                            </p>
                        </div>
                    </div>
                ))}
              </div>
              <MdChevronRight onClick={slideRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block lg:mx-[5rem]' size={40}/>
            </>
          )}
        </div>  
    </>
  )
}

export default Favorites