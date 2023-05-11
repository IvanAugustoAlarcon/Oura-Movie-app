import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { updateMovie,addMovie, reset } from '../features/movies/movieSlice'
import Spinner from '../components/Spinner.jsx'

const MovieUpdate = () => {
  const { id } = useParams()
  
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: '',
    categoryArr: '',
    language: '',
    year: Number,
    time: Number,
    video:'',
  })

  const { name, desc, image, categoryArr, language, year, time,  video} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {movies, isLoading, isError, isSuccess, message } = useSelector((state) => state.movie)

  useEffect(() => {
    if (isError) {
        toast.error(message)
    }

    if (isSuccess) {
        navigate('/movies')
        toast.success('Movie updated successfully')
    }

    dispatch(reset())
    
  }, [movies, isError, isSuccess, message, navigate, dispatch, id])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(categoryArr !==''){
      var category = categoryArr.split(',')
    } else {
      category = ''
    }
    var movieData = { name, desc, image, category, language, year, time,  video }
    const allData = [id, movieData]
    dispatch(updateMovie(allData))
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <div className='w-full h-screen'>
        <div className='bg-black/60 fixed top-0 w-full h-screen' />
        <div className='fixed w-full px-4 py-24 z-50'>
          <div className='max-w-[28rem] h-[47rem] mx-auto bg-slate-700 text-white '>
            <div className='max-w-[20rem] mx-auto py-16'>
              <h1 className='text-3xl font-bold mb-7'>Update Movie</h1>
              <form className='w-full flex flex-col pay-4' onSubmit={handleSubmit}>
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  placeholder='Title'
                  onChange={handleChange}
                />
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='text'
                  name='desc'
                  id='desc'
                  value={desc}
                  placeholder='Overview'
                  onChange={handleChange}
                />
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='text'
                  name='image'
                  id='image'
                  value={image}
                  placeholder='Image'
                  onChange={handleChange}
                />
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='text'
                  name='categoryArr'
                  id='categoryArr'
                  value={categoryArr}
                  placeholder='Category'
                  onChange={handleChange}
                />
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='text'
                  name='language'
                  id='language'
                  value={language}
                  placeholder='Language'
                  onChange={handleChange}
                />
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='number'
                  name='year'
                  id='year'
                  value={year}
                  placeholder='Year'
                  onChange={handleChange}
                />
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='number'
                  name='time'
                  id='time'
                  value={time}
                  placeholder='Time'
                  onChange={handleChange}
                />
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='text'
                  name='video'
                  id='video'
                  value={video}
                  placeholder='video'
                  onChange={handleChange}
                />
                <button className='bg-red-600 py-3 my-6 rounded font-bold'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieUpdate