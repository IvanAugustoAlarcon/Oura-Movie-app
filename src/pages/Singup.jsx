import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, reset } from '../features/auth/authSlice.js'
import Spinner from '../components/Spinner.jsx'

const Singup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
        toast.error(message)
    }

    if (isSuccess) {
        navigate('/login')
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
    if (password !== password2){
      toast.error('The passwords are not the same')
  } else {
      const userData = { name, email, password }
      dispatch(registerUser(userData))
  }
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
          <div className='max-w-[28rem] h-[37rem] mx-auto bg-black/75 text-white '>
            <div className='max-w-[20rem] mx-auto py-16'>
              <h1 className='text-3xl font-bold mb-7'>Sign Up</h1>
              <form className='w-full flex flex-col pay-4' onSubmit={handleSubmit}>
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  placeholder='Full Name'
                  onChange={handleChange}
                />
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
                <input
                  className='p-3 my-2 bg-gray-600 rounded'
                  type='password'
                  name='password2'
                  id='password2'
                  value={password2}
                  placeholder='Confirm your password'
                  onChange={handleChange}
                />
                <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign Up</button>
                <p className='py-8 text-gray-500'>Already subscribed to Oura? <Link to='/login' className='text-white mx-2'>Login</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Singup
