import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'

const Main = () => {
  const [Loading, setLoading] = useState(true)
  const { movies, isLoading } = useSelector((state) => state.movie)

  useEffect(() => {
    if(!isLoading){
      setLoading(false)
    }
  }, [isLoading])
  
  if(!Loading){
    var movie = movies[Math.floor(Math.random() * movies.length)]
  }

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str
    }
  }
  
  return (
    <>
    {Loading ? (<Spinner />) : (
      <>
      <div className='w-full h-[45rem] text-white'>
               <div className='w-full h-full'>
                 <div className='absolute w-full h-[45rem] bg-gradient-to-r from-black' />
                 <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original//${movie.image}`} alt={movie.title} />
                 <div className='absolute w-full top-[20%] p-4 md:p-8'>
                   <h1 className='text-3xl md:text-5xl font-bold'>{movie.name}</h1>
                   <div className='my-4'>
                     <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>Play</button>
                     <button className='border text-white border-gray-300 py-2 px-5 ml-4'>Watch Later</button>
                   </div>
                   <p className='text-gray text-sm'>Released: {movie.year}</p>
                   <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
                     {truncateString(movie.desc, 170)}
                   </p>
                 </div>
               </div>
             </div>
      </>             
    )}
    </>
  )
}

export default Main
