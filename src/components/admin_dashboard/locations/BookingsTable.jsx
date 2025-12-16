import React from 'react';

// ================= STATUS COLOR FUNCTION =================
const getStatusColor = (status) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-green-500/20 text-green-400';
    case 'Pending':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'Completed':
      return 'bg-blue-500/20 text-blue-400';
    case 'Cancelled':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

// ================= STATIC BOOKINGS DATA =================
const bookings = [
  {
    id: 101,
    user: 'Rahul Sharma',
    sport: 'Cricket',
    turf: 'Green Field Arena',
    date: '12 Aug 2025',
    time: '6:00 PM',
    duration: '2 Hours',
    amount: '₹2000',
    status: 'Confirmed'
  },
  {
    id: 102,
    user: 'Amit Verma',
    sport: 'Football',
    turf: 'City Sports Turf',
    date: '13 Aug 2025',
    time: '8:00 PM',
    duration: '1 Hour',
    amount: '₹1200',
    status: 'Pending'
  },
  {
    id: 103,
    user: 'Sneha Patel',
    sport: 'Badminton',
    turf: 'Smash Court',
    date: '14 Aug 2025',
    time: '7:00 AM',
    duration: '1 Hour',
    amount: '₹800',
    status: 'Completed'
  },
  {
    id: 104,
    user: 'Karan Mehta',
    sport: 'Football',
    turf: 'Arena X',
    date: '15 Aug 2025',
    time: '9:00 PM',
    duration: '2 Hours',
    amount: '₹2200',
    status: 'Cancelled'
  }
];

// ================= BOOKINGS TABLE =================
const BookingsTable = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search bookings..."
            className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          <select className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Export Data
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Sport</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Turf</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Duration</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
              >
                <td className="py-4 px-4 text-gray-400">#{booking.id}</td>
                <td className="py-4 px-4 text-white font-medium">{booking.user}</td>
                <td className="py-4 px-4 text-gray-300">{booking.sport}</td>
                <td className="py-4 px-4 text-gray-300">{booking.turf}</td>
                <td className="py-4 px-4 text-gray-300">{booking.date}</td>
                <td className="py-4 px-4 text-gray-300">{booking.time}</td>
                <td className="py-4 px-4 text-gray-300">{booking.duration}</td>
                <td className="py-4 px-4 text-white font-medium">{booking.amount}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTable;
