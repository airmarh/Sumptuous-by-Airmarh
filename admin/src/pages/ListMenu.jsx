import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { MdDeleteForever } from 'react-icons/md'

const ListMenu = ({token}) => {
  const [list, setList] = useState([])
  
  const fetchList = async () => {
    try{
      const response = await axios.get(`${backendUrl}/api/product/getAll`, {headers: {token}})
      console.log(response)
      if(response.data.success)
        setList(response.data.products)
      else
        toast.error(response.data.message)
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  },[])

  return (
    <div className="max-w-5xl">
      <p className="mb-4 font-bold text-2xl">Menu List</p>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        
        <div className="grid grid-cols-[80px_2fr_1.5fr_1fr_80px] items-center px-4 py-3 text-sm font-semibold text-gray-600 border-b">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[80px_2fr_1.5fr_1fr_80px] items-center px-4 py-3 text-sm border-b last:border-none hover:bg-gray-50 transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 object-cover rounded-md border"
            />

            <p className="font-medium text-gray-800">{item.name}</p>

            <span className="text-gray-600">{item.category}</span>

            <span className="font-semibold text-gray-800">${item.price}</span>

            <div className="flex justify-center">
              <MdDeleteForever className="text-xl text-red-500 cursor-pointer hover:text-red-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListMenu