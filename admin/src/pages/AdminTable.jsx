import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const AdminTable = () => {
  const [reservations, setReservations] = useState([])
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;

    try{
      await axios.delete(`${backendUrl}/api/reservation/delete/${id}`)
      toast.success("Reservation cancelled")
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchReservations = async () => {
      try{
        const response = await axios.get(`${backendUrl}/api/reservation/getAll`)
        setReservations(response.data.reservations)
        console.log(response.data)
      }catch(error){
        console.log(error)
      }
    }

    fetchReservations()
  },[])
  return (
    <div className='min-h-scrren'>
      <h2 className='text-3xl font-bold text-gray-700 text-center mb-6'>Restaurant Reservations</h2>
      
      <div className='overflow-x-auto'>
        <table className='w-full shadow-lg rounded-xl'>
          <thead>
            <tr className='bg-amber-500 text-left'>
              <th className='p-3'>Name</th>
              <th className='p-3'>Email</th>
              <th className='p-3'>Phone</th>
              <th className='p-3'>Date</th>
              <th className='p-3'>Time</th>
              <th className='p-3'>Guests</th>
              <th className='p-3'>Delete</th>
            </tr>
          </thead>

          <tbody>
            {
              reservations.length === 0 ? (
                <tr>
                  <td colSpan="7" className='p-4 text-center'>No Reservations Found</td>
                </tr>
              ) : (
                reservations.map((res, index) => (
                  <tr key={index} className='border-b hover:bg-gray-50'>
                    <td className='p-3'>{res.name}</td>
                    <td className='p-3'>{res.email}</td>
                    <td className='p-3'>{res.phone}</td>
                    <td className='p-3'>{res.date}</td>
                    <td className='p-3'>{res.time}</td>
                    <td className='p-3'>{res.guests}</td>
                    <td className='p-3'>
                      <button onClick={() => handleDelete(res._id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>Delete</button>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminTable