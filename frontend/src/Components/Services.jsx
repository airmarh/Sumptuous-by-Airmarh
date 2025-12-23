import React from 'react'
import image1 from '../assets/breakfast.jpg'
import image2 from '../assets/serv3.jpg'
import image3 from '../assets/appetizer.jpg'
import line from '../assets/line2.png'

const Services = () => {
  return (
    <div>
      <div className='flex bg3'>
        <div className='w-1/3'>
          <div className='p-16'>
            <img src={line} alt="" className='-mb-2 w-45 place-self-center'/>
            <h2 className='text bg-amber-300 text-center text-4xl'>Breakfast</h2>
            <p className='text-center mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div>
            <img src={image1} alt="" className='h-160'/>
          </div>
        </div>

        <div className='w-1/3'>
          <div>
            <img src={image2} alt="" className='h-160'/>
          </div>
          <div className='p-16'>
            <img src={line} alt="" className='-mb-2 w-45 place-self-center'/>
            <h2 className='text bg-amber-300 text-center text-4xl'>Drinks</h2>
            <p className='text-center mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>

        <div className='w-1/3'>
          <div className='p-16'>
            <img src={line} alt="" className='-mb-2 w-45 place-self-center'/>
            <h2 className='text bg-amber-300 text-center text-4xl'>Appetizers</h2>
            <p className='text-center mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div>
            <img src={image3} alt="" className='h-160'/>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default Services