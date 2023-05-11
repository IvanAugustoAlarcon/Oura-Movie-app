import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RoutesIndex from './routes'
import Navbar from './components/Navbar'

function App () {
  return (
    <>
      <Navbar />
      <RoutesIndex />
      <ToastContainer />  
    </>
  )
}

export default App
