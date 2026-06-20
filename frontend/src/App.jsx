import React from 'react'
import Hero from './Components/Hero'
import Services from './Components/Services'
import Menu from './Components/Menu'
import ReservationForm from './Components/ReservationForm'
import Footer from './Components/Footer'
<<<<<<< Updated upstream
=======
import { ToastContainer } from 'react-toastify' 
import Navbar from './Components/Navbar'
export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
>>>>>>> Stashed changes

const App = () => {
  return (
    <div>
      <Hero/>
      <Services/>
      <Menu/>
      <ReservationForm />
      <Footer />
    </div>
  )
}

export default App