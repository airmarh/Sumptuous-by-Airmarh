import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ReservationModal = ({ isOpen, onClose, formData, setFormData, onSubmit, editing, timeSlot }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg2 rounded-2xl shadow-xl w-full max-w-lg relative p-6'>
        <button onClick={onClose} className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'><FaTimes size={20} /></button>

        <h2 className='text-2xl font-bold mb-4 text-gray-700'>{editing ? 'Edit Reservation' : 'New Reservation'}</h2>

        <form onSubmit={onSubmit} className='space-y-4'>
          <div className='grid md:grid-cols-2 gap-4'>
            <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Full Name' 
              required className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 bg-white' />
            <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Email'
              required className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 bg-white' />
            <input type="tel" name='phone' value={formData.phone} onChange={handleChange} placeholder='Phone Number'
              required className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 bg-white' />
            <input type="date" name='date' value={formData.date} onChange={handleChange}
              required className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 bg-white' />
            <select name='time' value={formData.time} onChange={handleChange}
              required className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 bg-white' >
              <option value="">Select Time</option> {timeSlot().map((slot, idx) => ( <option key={idx} value={slot}>{slot}</option> ))}
            </select>
            <select name='guests' value={formData.guests} onChange={handleChange}
              required className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500 bg-white' >
              {[...Array(10).keys()].map(i => ( 
                <option key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}</option> ))}
            </select>
          </div>

          <button
            type='submit'
            className='w-full bg-amber-400 hover:bg-amber-500 text-white py-3 rounded-xl font-bold transition'
          >
            {editing ? 'Update Reservation' : 'Create Reservation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;