import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosLogOut, IoMdAddCircleOutline } from 'react-icons/io'
import { MdFormatListBulletedAdd, MdDashboard } from 'react-icons/md'
import { PiListBulletsFill } from 'react-icons/pi'

const Sidebar = ({setToken}) => {
  return (
    <div className='w-[22%] min-h-screen border-r-2 border-gray-200 bg-white'>
      <div className='mt-4 px-6'>
        <h2 className='text-[32px] font-bold'>Sumptuous by Airmarh</h2>
      </div>
      <div className='flex flex-col gap-4 pt-6'>
        <NavLink to="/" className="flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-amber-400 hover:text-white">
          <MdDashboard className='text-[35px] text-black'/>
          <p className='hidden md:block text-base'>Dashboard</p>
        </NavLink>
        
        <NavLink to="/add" className="flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-amber-400 hover:text-white">
          <IoMdAddCircleOutline className='text-[35px] text-black'/>
          <p className='hidden md:block text-base'>Add Product</p>
        </NavLink>

        <NavLink to="/list" className="flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-amber-400 hover:text-white">
          <MdFormatListBulletedAdd className='text-[35px] text-black'/>
          <p className='hidden md:block text-base'> List Products</p>
        </NavLink>
        
        <NavLink to="/table" className="flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-amber-400 hover:text-white">
          <PiListBulletsFill className='text-[35px] text-black'/>
          <p className='hidden md:block text-base'>Reservations</p>
        </NavLink>

        <button onClick={() => { localStorage.removeItem('token'); setToken('') }} className='flex items-center gap-3 px-6 py-3 border-b-2 border-gray-200 text-gray-600 hover:bg-amber-400 hover:text-white w-full text-left'>
          <IoIosLogOut className='text-[35px] text-black'/>
          <p className='hidden md:block text-base'>Logout</p>
        </button>
      </div>
    </div>
  )
}

export default Sidebar