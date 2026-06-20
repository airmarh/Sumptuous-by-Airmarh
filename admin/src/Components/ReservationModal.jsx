import React from 'react';
import { FaTimes } from 'react-icons/fa';

const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour < 21; hour++) {
    for (const minute of [0, 30]) {
      const h = hour % 12 === 0 ? 12 : hour % 12
      const period = hour < 12 ? 'AM' : 'PM'
      slots.push(`${h}:${minute === 0 ? '00' : '30'} ${period}`)
    }
  }
  return slots
}

const TIME_SLOTS = generateTimeSlots()

const ReservationModal = ({ isOpen, onClose, formData, setFormData, onSubmit, editing }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (slot) => {
    setFormData({ ...formData, time: slot });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto py-6'>
      <div className='bg-white rounded-2xl shadow-xl w-full max-w-lg relative p-6 mx-4'>
        <button onClick={onClose} className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'>
          <FaTimes size={20} />
        </button>

        <h2 className='text-2xl font-bold mb-4 text-gray-700'>
          {editing ? 'Edit Reservation' : 'New Reservation'}
        </h2>

        <form onSubmit={onSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-3'>
            <input type="text" name='name' value={formData.name} onChange={handleChange}
              placeholder='Full Name' required
              className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500' />
            <input type="email" name='email' value={formData.email} onChange={handleChange}
              placeholder='Email' required
              className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500' />
            <input type="tel" name='phone' value={formData.phone} onChange={handleChange}
              placeholder='Phone Number' required
              className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500' />
            <select name='guests' value={formData.guests} onChange={handleChange} required
              className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500'>
              {[...Array(10).keys()].map(i => (
                <option key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className='grid gap-1'>
            <label className='text-sm font-semibold text-gray-600'>Date</label>
            <input type="date" name='date' value={formData.date} onChange={handleChange}
              required
              className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500' />
          </div>

          {/* Time chips */}
          <div className='grid gap-2'>
            <label className='text-sm font-semibold text-gray-600'>Time</label>
            <div className='grid grid-cols-4 gap-2'>
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type='button'
                  onClick={() => handleTimeSelect(slot)}
                  className={`p-2 text-xs border rounded-lg transition font-medium
                    ${formData.time === slot
                      ? 'bg-amber-400 text-white border-amber-400'
                      : 'bg-white hover:bg-amber-50 hover:border-amber-400 border-gray-300 text-gray-700'
                    }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Status (edit only) */}
          {editing && (
            <div className='grid gap-1'>
              <label className='text-sm font-semibold text-gray-600'>Status</label>
              <select name='status' value={formData.status} onChange={handleChange}
                className='w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-500'>
                <option value='confirmed'>Confirmed</option>
                <option value='cancelled'>Cancelled</option>
                <option value='no_show'>No Show</option>
              </select>
            </div>
          )}

          <button type='submit'
            className='w-full bg-amber-400 hover:bg-amber-500 text-white py-3 rounded-xl font-bold transition'>
            {editing ? 'Update Reservation' : 'Create Reservation'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
