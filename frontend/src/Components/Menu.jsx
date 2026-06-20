import React, { useContext, useState } from 'react'
import { MenuContext } from '../Contexts/MenuContext'
import { categoryItem } from '../assets/assets'

const Menu = () => {
  const {products} = useContext(MenuContext)
  const [category, setCategory] = useState("All")
  
  return (
<<<<<<< Updated upstream
    <div className='px-4 py-12 max-w-6xl mx-auto'>
      
      <div className='text-center mb-6'>
        <h1 className='text-4xl font-bold text-white'>Discover Our Menu</h1>
=======
    <section id='menu'>
      <div className='px-4 py-12 max-w-6xl mx-auto'>
        
        <div className='text-center mb-6'>
          <h1 className='text-4xl font-bold text-white'>Discover Our Menu</h1>
        </div>

        <div className='text-center mb-8 flex gap-8'> 
          {categoryItem.map((item, index) => (
            <li key={index} 
            onClick={()=> setCategory((prev) => prev === item.category_title ? "All" : item.category_title)}
            className={`cursor-pointer px-10 py-3 list-none rounded-full font-medium text-sm transition-all duration-200 ${
              category === item.category_title ? "bg-amber-400 border-2 border-dashed border-gray-600" : "border-2 border-dashed border-gray-600" 
            }`}>{item.category_title}</li>
          ))}
        </div>

        <div className='grid grid-cols-2 gap-8'>
            {
              products.length > 0 ? (
                products.filter(
                  (product) => category === "All" || category === product.category
                ).map((product) => (
                  <div key={product._id} className='flex items-center gap-6 p-4 border-2 border-dashed border-gray-600 rounded-xl transition hover:shadow-md'>
                    <img src={product.image} alt="" className='w-30 h-30 object-cover rounded-full' />
                    <div className='flex-1'>
                      <div className='flex justify-between items-center'>
                        <h3 className='text-lg font-semibold'>{product.name}</h3>
                        <span className='text-lg font-semibold text-amber-500 relative ml-4'>
                          <span className="before:content-[''] before:absolute before:w-10 before:border-b before:dotted before:border-gray-400 before:-left-12 before:top-1/2 before:transform before:translate-y-1/2"></span>
                          ₦{product.price.toLocaleString()}
                        </span>
                      </div>
                      <p className='text-sm text-gray-500 mt-1'>{product.description}</p>
                    </div>
                  </div>
                ))
              ): (
                <p className='text-sm col-span-2 text-gray-500'>Nothing in the menu</p>
              )
            }
        </div>
>>>>>>> Stashed changes
      </div>

      <div className='text-center mb-8 flex gap-8'> 
        {categoryItem.map((item, index) => (
          <li key={index} 
          onClick={()=> setCategory((prev) => prev === item.category_title ? "All" : item.category_title)}
          className={`cursor-pointer px-10 py-3 list-none rounded-full font-medium text-sm transition-all duration-200 ${
            category === item.category_title ? "bg-amber-400 border-2 border-dashed border-gray-600" : "border-2 border-dashed border-gray-600" 
          }`}>{item.category_title}</li>
        ))}
      </div>

      <div className='grid grid-cols-2 gap-8'>
          {
            products.length > 0 ? (
              products.filter(
                (product) => category === "All" || category === product.category
              ).map((product) => (
                <div key={product._id} className='flex items-center gap-6 p-4 border-2 border-dashed border-gray-600 rounded-xl transition hover:shadow-md'>
                  <img src={product.image} alt="" className='w-30 h-30 object-cover rounded-full' />
                  <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                      <h3 className='text-lg font-semibold'>{product.name}</h3>
                      <span className='text-lg font-semibold text-amber-500 relative ml-4'>
                        <span className="before:content-[''] before:absolute before:w-10 before:border-b before:dotted before:border-gray-400 before:-left-12 before:top-1/2 before:transform before:translate-y-1/2"></span>
                        ${product.price}
                      </span>
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
              ))
            ): (
              <p className='text-sm col-span-2 text-gray-500'>Nothing in the menu</p>
            )
          }
      </div>
    </div>
  )
}

export default Menu