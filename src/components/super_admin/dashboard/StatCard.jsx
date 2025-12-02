import React from 'react';
import { Calendar, Users, DollarSign, Clock } from 'lucide-react';

const iconMap = {
  Calendar,
  Users,
  DollarSign,
  Clock
};

const StatCard = ({ stat }) => {
  const Icon = iconMap[stat.icon];
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`${stat.color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-green-400 text-sm font-medium">{stat.change}</span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
      <p className="text-2xl font-bold text-white">{stat.value}</p>
    </div>
  );
};

export default StatCard;
