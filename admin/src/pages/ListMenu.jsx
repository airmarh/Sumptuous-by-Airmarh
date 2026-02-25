import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const ListMenu = ({ token }) => {
  const [list, setList] = useState([])
  const navigate = useNavigate()

  const fetchList = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/getAll`, { headers: { token } })
      data.success ? setList(data.products) : toast.error(data.message)
    } catch (err) { toast.error(err.message) }
  }

  const deleteProduct = async id => {
    if (!window.confirm('Delete this product?')) return
    try {
      const { data } = await axios.delete(`${backendUrl}/api/product/remove`, { data: { _id: id }, headers: { token } })
      if (data.success) { toast.success(data.message); fetchList() }
      else toast.error(data.message)
    } catch (err) { toast.error(err.message) }
  }

  const handleEdit = item => navigate('/add', { state: { product: item } })

  useEffect(() => { fetchList() }, [])

  return (
    <div className="min-h-screen bg-amber-50 p-8 flex justify-center">
      <div className="w-full max-w-6xl">

=        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Menu Management</h1>
          <p className="text-slate-500 mt-1">Manage, edit and organize your menu items</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">

          <div className="grid grid-cols-[90px_2fr_1.5fr_1fr_120px] px-6 py-4 bg-amber-50 text-sm font-semibold text-amber-900 border-b">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span className="text-center">Actions</span>
          </div>

          {list.length === 0 && (
            <div className="p-10 text-center text-slate-400">No menu items found.</div>
          )}

          {list.map(item => (
            <div
              key={item._id}
              className="grid grid-cols-[90px_2fr_1.5fr_1fr_120px] items-center px-6 py-4 border-b last:border-none hover:bg-amber-50/40 transition"
            >
              <img src={item.image} alt={item.name}
                className="w-16 h-16 object-cover rounded-xl shadow-sm border" />

              <div>
                <p className="font-semibold text-slate-800">{item.name}</p>
                <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
              </div>

              <span className="text-slate-600">{item.category}</span>

              <span className="font-bold text-slate-900">
                ₦{Number(item.price).toLocaleString()}
              </span>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                  title="Edit"
                >
                  <MdEdit className="text-xl text-blue-600" />
                </button>

                <button
                  onClick={() => deleteProduct(item._id)}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition"
                  title="Delete"
                >
                  <MdDeleteForever className="text-xl text-red-600" />
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default ListMenu