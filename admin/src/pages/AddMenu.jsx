import uploadImage from '../assets/upload.jpg'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'


const AddMenu = ({ token }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const editItem = location.state?.product || null
  const isEdit = !!editItem

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  })

  useEffect(() => {
    if (editItem) {
      setForm({
        name: editItem.name || '',
        description: editItem.description || '',
        price: editItem.price || '',
        category: editItem.category || '',
        image: editItem.image || null
      })
    }
  }, [editItem])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleImageChange = e => setForm({ ...form, image: e.target.files[0] })

  const resetForm = () => setForm({ name:'', description:'', price:'', category:'', image:null })

  const OnSubmitHandler = async e => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('description', form.description)
      formData.append('price', form.price)
      formData.append('category', form.category)
      if (form.image instanceof File) formData.append('image', form.image)

      const url = isEdit
        ? `${backendUrl}/api/product/update/${editItem._id}`
        : `${backendUrl}/api/product/add`

      const method = isEdit ? 'put' : 'post'

      const { data } = await axios[method](url, formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        resetForm()
        navigate('/list')
      } else toast.error(data.message)

    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }



  return (
    <div className="min-h-screen bg-amber-50 px-8 py-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-amber-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-8">
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">{isEdit ? 'Edit Menu Item' : 'Add Menu Item'}</h1>
        <hr className="mb-8 border-slate-200" />

      <form onSubmit={OnSubmitHandler} className="grid gap-6">
        <div>
          <p className="mb-2 font-medium text-gray-700">Product Image</p>

          <label htmlFor="image" className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 transition hover:border-amber-500 hover:text-amber-500">
            <img src={ form.image instanceof File ? URL.createObjectURL(form.image) : form.image || uploadImage } className="w-32 h-32 object-cover rounded-md border cursor-pointer" />
            <input type="file" id="image" hidden onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
          </label>
        </div>
    
        <div>
          <label className="mb-2 block font-medium text-gray-700">Product Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full rounded-lg border border-gray-300 p-3 focus:border-amber-400 focus:outline-none focus:ring-amber-400" placeholder="Enter product name"/>
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} 
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-amber-400 focus:outline-none focus:ring-amber-400" placeholder="Short product description" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium text-gray-700">Category</label>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-amber-400 focus:outline-none focus:ring-amber-400">
              <option value="">Select category</option>
              <option>Spaghetti</option>
              <option>Pizza</option>
              <option>Rice</option>
              <option>Noodles</option>
              <option>Chicken</option>
              <option>Drinks</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">Price</label>
            <input name="price" value={form.price} onChange={handleChange} type="number"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-amber-400 focus:outline-none focus:ring-amber-400" placeholder="₦" />
          </div>
        </div>

        <button type="submit" className="mt-4 w-fit rounded-lg bg-amber-400 px-14 py-3 font-semibold text-white transition hover:bg-amber-600">
          {isEdit ? 'Update Menu' : 'Add Menu'}</button>

      </form>
    </div>
    </div>
  )
}

export default AddMenu