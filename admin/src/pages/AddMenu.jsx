import React from 'react'
import uploadImage from '../assets/upload.jpg'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const AddMenu = ({token}) => {
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      if(image)
        formData.append("image", image)

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {headers: {token}})
      if(response.data.success){
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setPrice("")
        setCategory("")
        setImage(null)
      }
      else{
        toast.error(response.data.message)

      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='w-md'>
      <form onSubmit={OnSubmitHandler} className="flex flex-col gap-6">
        <div>
          <p className="mb-2 font-medium">Upload Image</p>
          <label htmlFor="image">
            <img
              src={!image ? uploadImage : URL.createObjectURL(image)}
              alt=""
              className="w-32 cursor-pointer border border-dashed p-2"
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        </div>

        <div>
          <p className="mb-2 font-medium">Product Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            type="text"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <p className="mb-2 font-medium">Product Description</p>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            type="text"
            placeholder="Enter product description"
          />
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <p className="mb-2 font-medium">Product Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            >
              <option>All</option>
              <option>Spaghetti</option>
              <option>Pizza</option>
              <option>Rice</option>
              <option>Noodles</option>
              <option>Chicken</option>
              <option>Drinks</option>
            </select>
          </div>

          <div className="w-35">
            <p className="mb-2 font-medium">Product Price</p>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="40"
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-fit px-16 py-3 bg-amber-500 text-white rounded hover:opacity-90"
        >Add Menu</button>

      </form>
    </div>

  )
}

export default AddMenu