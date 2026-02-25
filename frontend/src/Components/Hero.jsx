import React from 'react'
import bgImage from '../assets/hero.jpg'
import line from '../assets/line2.png'
import Navbar from '../Components/Navbar'


const Hero = () => {
  return (
    <section id='home' className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/50" />

      <Navbar />

      <div className="relative z-20 flex h-full flex-col items-center justify-start px-6 text-center text-white pt-20 md:pt-40">
        <img src={line} alt="" className="mb-6 opacity-90" />
        <h2 className="mb-4 text-xs md:text-sm tracking-[0.3em] uppercase text-amber-400">Where Delight Meets Taste</h2>
        <h1 className="mb-8 max-w-4xl text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
          Sumptuous <span className="text-amber-500">by Airmarh</span>
        </h1>
        <a href="#reserve" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-10 py-4 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:bg-amber-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400/50" >BOOK A TABLE </a>
      </div>
    </section>
  )
}


export default Hero