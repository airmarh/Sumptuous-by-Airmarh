import React, { useState } from 'react'
import { backendUrl } from '../App';
import ContactDetails from './ContactDetails'
import axios from 'axios'
import { toast } from 'react-toastify'


const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "1"
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${backendUrl}/api/reservation/create`, formData)
      toast.success("Reservation successful")

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "1"
      })
    } catch (error) {
      console.log(error)
    }
  }

  const timeSlot = () => {
    const slots = [];
    for (let hour = 9; hour < 21; hour++) {
      const startHour = hour % 12 === 0 ? 12 : hour % 12;
      const startPeriod = hour < 12 ? "AM" : "PM";

      const endHour = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12 ;
      const endPeriod = (hour + 1) < 12 ? "AM" : "PM";

      slots.push(`${startHour}:00 ${startPeriod} - ${endHour}:00 ${endPeriod}`)
    }
    return slots;
  }

  return (
    <section id='reserve'>
      <div className='min-h-screen bg3 p-7 md:p-14'>
        <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-10'>

          <form onSubmit={handleSubmit} className='md:col-span-2 bg2 p-8 shadow-md'>
            <h2 className='text-xl font-semibold text-amber-500 uppercase tracking-wider'>Online Reservation</h2>
            <h1 className='text-3xl font-bold mb-4'>
              Dine With Us <span className='text-amber-500'>- Reserve Now</span>
            </h1>

            <div className='grid md:grid-cols-2 gap-4'>
              <div className='grid gap-1.5'>
                <label className='font-bold'>Full Name</label>
                <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Full Name' required className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300' />
              </div>

              <div className='grid gap-1.5'>
                <label className='font-bold'>Email</label>
                <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Email' required className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300' />
              </div>

              <div className='grid gap-1.5'>
                <label className='font-bold'>Phone Number</label>
                <input type="tel" name='phone' value={formData.phone} onChange={handleChange} placeholder='Phone Number' required className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300' />
              </div>

              <div className='grid gap-1.5'>
                <label className='font-bold'>Reservation Date</label>
                <input type="date" name='date' value={formData.date} onChange={handleChange} required className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300' />
              </div>

              <div className='grid gap-1.5'>
                <label className='font-bold'>Time of Reservation</label>
                <select name="time" value={formData.time} onChange={handleChange} className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300'>
                  <option value="">Select Time</option>
                  {timeSlot().map((slot, index) => <option key={index} value={slot}>{slot}</option>)}
                </select>
              </div>

              <div className='grid gap-1.5'>
                <label className='font-bold'>Number of Guests</label>
                <select name='guests' value={formData.guests} onChange={handleChange} className='w-full p-3 mb-3 border bg focus:ring focus:ring-gray-300'>
                  {[...Array(10).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? "Guest" : "Guests"}</option>)}
                </select>
              </div>
            </div>

            <button type='submit' className='w-full mt-4 bg-amber-500 text-white hover:bg-amber-600 transition font-bold'>
              Book A Table
            </button>
          </form>

          <ContactDetails />
        </div>
      </div>
    </section>
  )

}

export default ReservationForm