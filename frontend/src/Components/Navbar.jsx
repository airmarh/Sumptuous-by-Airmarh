import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between p-8 text-white'>
      <div className="flex-1"> </div>
      <ul className='flex gap-10 ml-auto'>
        <li><a href="#home" className="font-bold text-lg relative hover:text-amber-500 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-500 hover:after:w-full after:transition-all">HOME</a></li>
        <li><a href="#reserve" className="font-bold text-lg relative hover:text-amber-500 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-500 hover:after:w-full after:transition-all">RESERVATION</a></li>
        <li><a href="#menu" className="font-bold text-lg relative hover:text-amber-500 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-500 hover:after:w-full after:transition-all">MENU</a></li>
        <li><a href="#contact" className="font-bold text-lg relative hover:text-amber-500 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-500 hover:after:w-full after:transition-all">CONTACT</a></li>
      </ul>
    </div>
  )
}

export default Navbar