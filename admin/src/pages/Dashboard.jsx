import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { FaUtensils, FaCalendarAlt, FaUsers } from "react-icons/fa";

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    products: 0,
    reservations: 0,
    guestsToday: 0,
  });

  const [recentReservations, setRecentReservations] = useState([]);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      const productResponse = await axios.get(
        `${backendUrl}/api/product/getAll`,
        { headers: { token } }
      );

      const products = productResponse.data.products || [];

      const reservationResponse = await axios.get(
        `${backendUrl}/api/reservation/getAll`,
        { headers: { token } }
      );

      const reservations = reservationResponse.data.reservations || [];

      const today = new Date().toISOString().split("T")[0];

      const guestsToday = reservations
        .filter(res => res.date?.split("T")[0] === today)
        .reduce((total, res) => total + Number(res.guests || 0), 0);

      setStats({
        products: products.length,
        reservations: reservations.length,
        guestsToday: guestsToday,
      });

      setRecentReservations(reservations.slice(-5).reverse());

    } catch (error) {
      console.log("Dashboard Error:", error);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-10">

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome back 👋
        </h1>
        <p className="text-gray-500 mt-2">
          Here’s what’s happening today.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">

        <div className="bg-white p-8 rounded-xl shadow-md">
          <FaUtensils className="text-3xl text-amber-400 mb-4" />
          <h2 className="text-3xl font-bold">{stats.products}</h2>
          <p className="text-gray-500">Total Products</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <FaCalendarAlt className="text-3xl text-amber-400 mb-4" />
          <h2 className="text-3xl font-bold">{stats.reservations}</h2>
          <p className="text-gray-500">Total Reservations</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <FaUsers className="text-3xl text-amber-400 mb-4" />
          <h2 className="text-3xl font-bold">{stats.guestsToday}</h2>
          <p className="text-gray-500">Guests Today</p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Recent Reservations</h2>

        {recentReservations.length === 0 ? (
          <p className="text-gray-500">No recent reservations.</p>
        ) : (
          <div className="space-y-4">
            {recentReservations.map((res, index) => (
              <div
                key={index}
                className="flex justify-between border-b pb-3"
              >
                <span>{res.name}</span>
                <span className="text-gray-500">
                  {res.guests} Guests • {res.time}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;