import React from 'react'
import Hero from './Components/Hero'
import Services from './Components/Services'
import Menu from './Components/Menu'
import ReservationForm from './Components/ReservationForm'
import Footer from './Components/Footer'
import { ToastContainer } from 'react-toastify'

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

const App = () => {
  return (
    <div>
      <Hero/>
      <Services/>
      <Menu/>
      <ReservationForm />
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
