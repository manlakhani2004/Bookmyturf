import React from 'react';
import { getStatusColor } from '../data/mockdata';
// import { getStatusColor } from '../../data/mockData';

const RecentBookings = ({ bookings }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Sport</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Turf</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Time</th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                <td className="py-4 px-4 text-white">{booking.user}</td>
                <td className="py-4 px-4 text-gray-300">{booking.sport}</td>
                <td className="py-4 px-4 text-gray-300">{booking.turf}</td>
                <td className="py-4 px-4 text-gray-300">{booking.time}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;
