import React from 'react';
// import StatCard from '../components/dashboard/StatCard';
// import RecentBookings from '../components/dashboard/RecentBookings';
import { recentBookings, stats } from '../data/mockdata';
import RecentBookings from '../dashboard/RecentBookings';
import StatCard from '../dashboard/StatCard';
// import { stats, recentBookings } from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Super Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      <RecentBookings bookings={recentBookings} />
    </div>
  );
};

export default Dashboard;