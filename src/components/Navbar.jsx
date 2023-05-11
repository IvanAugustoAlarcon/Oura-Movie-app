import { useSelector,useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth) 

  const handleLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/login')
  }

  return (
    <div className='flex items-center justify-between p-5 z-[100] w-full absolute'>
      <Link to='/' className='text-red-600 text-4xl font-bold cursor-pointer'>Oura Movies</Link>
      <div >
        {user ? (
          <div className='account__div'>
            <Link to='/movies' className='pr-10 text-red menu__text'>Movies</Link>
            <Link to='/profile' className='pr-10'><i className='uil uil-user-square icon__account'></i></Link>
            <button className='bg-red-600 hover:bg-white px-6 py-2 rounded cursor-pointer text-white hover:text-black' onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <Link to='/login' className='text-white pr-4'>Sign In</Link>
            <Link to='/signup' className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>Sign Up</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
