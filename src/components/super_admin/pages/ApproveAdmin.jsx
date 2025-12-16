import React from 'react';
// import BookingsTable from '../components/bookings/BookingsTable';
import { allBookings } from '../data/mockdata';
import BookingsTable from '../bookings/BookingsTable';
import Approve from '../ApproveAdmin/Approve';
// import { allBookings } from '../data/mockData';

const ApproveAdmin = () => {
  return (
    <div className="space-y-6">
      {/* <div>
        <h1 className="text-3xl font-bold text-white mb-2">All Bookings</h1>
        <p className="text-gray-400">Manage and track all turf bookings.</p>
      </div> */}

      <Approve/>
    </div>
  );
};

export default ApproveAdmin;
