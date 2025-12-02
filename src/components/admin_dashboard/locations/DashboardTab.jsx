import React from 'react';
import { MapPin, Calendar, Users, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';
import Button from './ui/Button';

const DashboardTab = ({ locations, onAddLocationClick }) => {
const stats = [
  { 
    title: 'Total Locations', 
    value: locations?.length || 0,
    icon: MapPin, 
    color: 'from-cyan-400 to-blue-500', 
    glow: 'shadow-cyan-500/25' 
  },
  { 
    title: 'Total Sports', 
    value: (locations || []).reduce(
      (acc, loc) => acc + (loc.sports?.length || 0), 
      0
    ),
    icon: Calendar, 
    color: 'from-emerald-400 to-green-500', 
    glow: 'shadow-emerald-500/25' 
  },
  { 
    title: 'Active Bookings', 
    value: '0', 
    icon: Users, 
    color: 'from-purple-400 to-violet-500', 
    glow: 'shadow-purple-500/25' 
  },
  { 
    title: 'Revenue', 
    value: '₹0', 
    icon: TrendingUp, 
    color: 'from-orange-400 to-red-500', 
    glow: 'shadow-orange-500/25' 
  }
];


  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-slate-400 mt-2">Welcome back, Admin! ✨</p>
        </div>
        <div className="text-sm text-slate-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Button onClick={onAddLocationClick} variant="primary">
            Add Location
          </Button>
          <Button variant="success">
            View Reports
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;