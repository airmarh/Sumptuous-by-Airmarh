import React from 'react'
import Hero from './Components/Hero'
import Services from './Components/Services'
import Menu from './Components/Menu'
import ReservationForm from './Components/ReservationForm'
import Footer from './Components/Footer'

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