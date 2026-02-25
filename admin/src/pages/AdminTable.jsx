import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import ReservationModal from '../Components/ReservationModal';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: 1
};

const AdminTable = () => {
  const [reservations, setReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [editing, setEditing] = useState(false);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/reservation/getAll`);
      setReservations(response.data.reservations);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;

    try {
      await axios.delete(`${backendUrl}/api/reservation/delete/${id}`);
      toast.success("Reservation cancelled");
      setReservations(prev => prev.filter(r => r._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete reservation");
    }
  };

  const handleEditClick = (reservation) => {
    setFormData(reservation);
    setEditing(true);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setFormData(initialFormData);
    setEditing(false);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${backendUrl}/api/reservation/update/${formData._id}`, formData);
        toast.success("Reservation updated!");
      } else {
        const response = await axios.post(`${backendUrl}/api/reservation/create`, formData);
        toast.success("Reservation created!");
        setReservations(prev => [...prev, response.data]);
      }
      setIsModalOpen(false);
      setFormData(initialFormData);
      setEditing(false);
      fetchReservations();
    } catch (error) {
      console.log(error);
      toast.error("Failed to save reservation");
    }
  };

  const timeSlot = () => {
    const slots = [];
    for (let hour = 9; hour < 21; hour++) {
      const startHour = hour % 12 === 0 ? 12 : hour % 12;
      const startPeriod = hour < 12 ? "AM" : "PM";
      const endHour = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12;
      const endPeriod = (hour + 1) < 12 ? "AM" : "PM";
      slots.push(`${startHour}:00 ${startPeriod} - ${endHour}:00 ${endPeriod}`);
    }
    return slots;
  };

  return (
    <div className='min-h-screen p-6'>
      <h2 className='text-3xl font-bold text-gray-700 text-center mb-6'>Restaurant Reservations</h2>

      <div className='flex justify-end mb-4'>
        <button 
          onClick={handleCreateClick} 
          className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow-md'>
          <FaPlus /> Add Reservation
        </button>
      </div>

      <div className='overflow-x-auto'>
        <div className='bg-white shadow-lg rounded-xl'>
          <table className='w-full'>
            <thead>
              <tr className='bg-amber-300 text-left'>
                <th className='p-3'>Name</th>
                <th className='p-3'>Email</th>
                <th className='p-3'>Phone</th>
                <th className='p-3'>Date</th>
                <th className='p-3'>Time</th>
                <th className='p-3'>Guests</th>
                <th className='p-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan="7" className='p-4 text-center text-gray-500'>No Reservations Found</td>
                </tr>
              ) : (
                reservations.map((res, index) => (
                  <tr key={index} className='border-b hover:bg-amber-50 transition'>
                    <td className='p-3'>{res.name}</td>
                    <td className='p-3'>{res.email}</td>
                    <td className='p-3'>{res.phone}</td>
                    <td className='p-3'>{res.date}</td>
                    <td className='p-3'>{res.time}</td>
                    <td className='p-3'>{res.guests}</td>
                    <td className='p-3 flex gap-2'>
                      <button onClick={() => handleEditClick(res)} className='text-blue-500 hover:text-blue-700'>
                        <MdEdit size={18} />
                      </button>
                      <button onClick={() => handleDelete(res._id)} className='text-red-500 hover:text-red-700'>
                        <MdDeleteForever size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        editing={editing}
        timeSlot={timeSlot}
      />
    </div>
  );
};

export default AdminTable;