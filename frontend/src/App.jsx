import React from 'react'
import Hero from './Components/Hero'
import Services from './Components/Services'
import Menu from './Components/Menu'
import ReservationForm from './Components/ReservationForm'
import Footer from './Components/Footer'
import { ToastContainer } from 'react-toastify' 
import Navbar from './Components/Navbar'
import { Routes, Route } from 'react-router-dom'

export const backendUrl = 'http://localhost:4000'

const App = () => {
  return (
    <div>
      {/* <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
      </Routes>
      <Footer /> */}

      <ToastContainer />
      <Hero/>
      <Services/>
      <Menu/>
      <ReservationForm />
      <Footer />
    </div>
  )
}

export default App