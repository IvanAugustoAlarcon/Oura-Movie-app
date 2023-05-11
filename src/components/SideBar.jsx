import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


const SideBar = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth) 
  return (
    <>
        <div className='min-h-[5rem] container mx-6 px-5 pt-[8rem] '>
            <div className='xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6'>
                <div className='col-span-2 sticky bg-slate-700 border border-gray-800 p-6 rounded-md xl:mb-0 mb-5 max-w-xs'>
                        <Link to='/'><p className='text__menu'><i className='uil uil-estate icon__menu pr-1' /> Home </p></Link>
                        {user.isAdmin ? <Link to='addmovie'><p className='pt-4 text__menu'><i className='uil uil-plus-circle icon__menu pr-1'/> Add Movie </p></Link> : null}
                        <Link to='/movies'><p className='text__menu pt-4'><i className='uil uil-clapper-board icon__menu pr-1' /> Movies </p></Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default SideBar