import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
        toast.error(message)
    }

    if (isSuccess) {
        navigate('/')
    }

    dispatch(reset())
    
}, [user, isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = { email, password }
    dispatch(login(userData))
  }
  
  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <div className='w-full h-screen'>
        <img
          className='hidden sm:block absolute w-full h-full object-cover'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg' alt='/'
        />
        <div className='bg-black/60 fixed top-0 w-full h-screen' />
        <div className='fixed w-full px-4 py-24 z-50'>
          <div className='max-w-[28rem] h-[30rem] mx-auto bg-black/75 text-white '>
            <div className='max-w-[20rem] mx-auto py-16'>
              <h1 className='text-3xl font-bold mb-7'>Login</h1>
              <form className='w-full flex flex-col pay-4' onSubmit={handleSubmit}>
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='email'
                  name='email'
                  id='email'
                  value={email}
                  placeholder='Email'
                  autoComplete='email'
                  onChange={handleChange}
                />
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  placeholder='Password'
                  onChange={handleChange}
                />
                <button className='bg-red-600 py-3 my-6 rounded font-bold'>Login</button>
                <p className='py-8 text-gray-500'>New to Oura? <Link to='/signup' className='text-white mx-2'>Sign Up</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
