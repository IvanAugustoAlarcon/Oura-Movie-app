import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMoviesById } from '../features/movies/MovieServicesAPI'
import Spinner from '../components/Spinner'

const WatchPage = () => {
    const { id } = useParams()
    const [movieInfo, setMovieInfo] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [play, setPlay] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getMoviesById(id).then((data) => {
            setMovieInfo(data)
            setIsLoading(false)
        })
      }, [id])
    
    const Loading = () => {
        return (
            <Spinner />
        )
    }
    const ShowInfo = () => {
        return (
            <>
                <div className=' py-24'>
                    <div className=' container mx-auto p-6 mb-12'>
                        <div className='flex-btn flex-wrap mb-6 gap-2 rounded border border-gray-800 p-6'>
                            <Link to={`/movieinfo/${movieInfo?._id}`} className='md:text-xl text-md flex gap-3 items-center font-bold text-gray-300'>
                                <i className='uil uil-arrow-left'/> {movieInfo?.name}
                            </Link>
                        </div>
                        {play ? (<iframe src={movieInfo?.video} className='w-full h-[40rem]  allowfullscreen'></iframe>) : (<div className='w-full h-screen rounded-lg relative'>
                            <div className='absolute top-0 left-0 bottom-0 right-0 w-full bg-slate-400 bg-opacity-30 flex flex-col justify-center items-center border border-gray-800'>
                                <button onClick={() => setPlay(true)} className='bg-red-600 hover:bg-opacity-30 hover:text-black transitions bg-opacity-100 text-white rounded px-4 py-3 text-sm'>
                                    <i className='uil uil-play'/>
                                </button>
                            </div>
                            <img src={`https://image.tmdb.org/t/p/original//${movieInfo?.image}`} alt={movieInfo?.name} className='w-full h-full object-cover rounded-lg z-[100]' />
                        </div>)}
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

export default WatchPage