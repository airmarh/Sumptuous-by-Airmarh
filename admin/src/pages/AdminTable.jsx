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
  guests: 1,
  status: 'confirmed',
};

const STATUS_STYLES = {
  confirmed: 'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-600',
  no_show:   'bg-gray-100 text-gray-600',
};

const STATUS_LABELS = {
  confirmed: 'Confirmed',
  cancelled:  'Cancelled',
  no_show:   'No Show',
};

const PAGE_SIZE = 8;

const AdminTable = ({ token }) => {
  const [reservations, setReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [editing, setEditing] = useState(false);
  const [page, setPage] = useState(1);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/reservation/getAll`, { headers: { token } });
      setReservations(response.data.reservations);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch reservations");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
    try {
      await axios.delete(`${backendUrl}/api/reservation/delete/${id}`, { headers: { token } });
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
        await axios.put(`${backendUrl}/api/reservation/update/${formData._id}`, formData, { headers: { token } });
        toast.success("Reservation updated!");
      } else {
        await axios.post(`${backendUrl}/api/reservation/create`, formData);
        toast.success("Reservation created!");
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

  // Pagination
  const totalPages = Math.ceil(reservations.length / PAGE_SIZE);
  const paginated = reservations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
                <th className='p-3'>Status</th>
                <th className='p-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="8" className='p-4 text-center text-gray-500'>No Reservations Found</td>
                </tr>
              ) : (
                paginated.map((res) => (
                  <tr key={res._id} className='border-b hover:bg-amber-50 transition'>
                    <td className='p-3'>{res.name}</td>
                    <td className='p-3'>{res.email}</td>
                    <td className='p-3'>{res.phone}</td>
                    <td className='p-3'>{res.date}</td>
                    <td className='p-3'>{res.time}</td>
                    <td className='p-3'>{res.guests}</td>
                    <td className='p-3'>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[res.status] || STATUS_STYLES.confirmed}`}>
                        {STATUS_LABELS[res.status] || 'Confirmed'}
                      </span>
                    </td>
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

      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 mt-6'>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className='px-3 py-1 rounded border text-sm disabled:opacity-40 hover:bg-amber-50'>
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border text-sm ${page === i + 1 ? 'bg-amber-400 text-white border-amber-400' : 'hover:bg-amber-50'}`}>
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className='px-3 py-1 rounded border text-sm disabled:opacity-40 hover:bg-amber-50'>
            Next
          </button>
        </div>
      )}

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        editing={editing}
      />
    </div>
  );
};

export default AdminTable;
