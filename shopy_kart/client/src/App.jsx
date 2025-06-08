import React from 'react' 
import './App.css'
import {Outlet} from 'react-router-dom'
import Navigation from './pages/Auth/Navigation'
import {ToastContainer} from 'react-toastify' 
import '../node_modules/react-toastify/dist/ReactToastify.css'


function App() { 

  return (
    <>
      <ToastContainer/>
        <Navigation />
        <main className='py-3'>
          <Outlet />
        </main>
      
    </>
  )
}

export default App