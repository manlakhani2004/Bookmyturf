import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ================= STATUS COLOR FUNCTION =================
const getStatusColor = (status) => {
  switch (status) {
    case 'CONFIRMED':
      return 'bg-green-500/20 text-green-400';
    case 'PENDING':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'COMPLETED':
      return 'bg-blue-500/20 text-blue-400';
    case 'CANCELLED':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

// ================= SUPER ADMIN BOOKINGS TABLE =================
const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace if using other auth
        const { data } = await axios.get(
          'http://localhost:8080/api/bookings/super-admin/confirmed-bookings',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(data);
        setFilteredBookings(data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = bookings;

    if (statusFilter) {
      filtered = filtered.filter(
        (b) => b.status === statusFilter.toUpperCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((b) =>
        b.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.sportName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.locationName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [statusFilter, searchQuery, bookings]);

  // Download CSV
  const downloadCSV = () => {
    const csvHeader = 'Booking ID,User ID,User Name,Sport,Location,Amount,Booking Time\n';
    const csvRows = filteredBookings.map(b =>
      `${b.bookingId},${b.userId},"${b.userName}","${b.sportName}","${b.locationName}",${b.totalAmount},${b.bookingTime}`
    );
    const csvData = [csvHeader, ...csvRows].join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'super_admin_bookings.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search bookings..."
            className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          onClick={downloadCSV}
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">User ID</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">User Name</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Sport</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Location</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Booking Time</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((b) => (
              <tr
                key={b.bookingId}
                className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
              >
                <td className="py-4 px-4 text-gray-400">#{b.bookingId}</td>
                <td className="py-4 px-4 text-white font-medium">{b.userId}</td>
                <td className="py-4 px-4 text-white font-medium">{b.userName}</td>
                <td className="py-4 px-4 text-gray-300">{b.sportName}</td>
                <td className="py-4 px-4 text-gray-300">{b.locationName}</td>
                <td className="py-4 px-4 text-white font-medium">₹{b.totalAmount}</td>
                <td className="py-4 px-4 text-gray-300">{new Date(b.bookingTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTable;
