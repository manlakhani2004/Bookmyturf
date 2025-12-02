import React from 'react';
import { LayoutDashboard, Calendar, Menu, X } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, currentPage, setCurrentPage }) => {
  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800/80 backdrop-blur-lg border-r border-gray-700 transition-all duration-300 flex flex-col`}>
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold text-white">BookMyTurf</h1>
              <p className="text-xs text-gray-400 mt-1">Super Admin Panel</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5 text-gray-400" /> : <Menu className="w-5 h-5 text-gray-400" />}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            currentPage === 'dashboard'
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="font-medium">Dashboard</span>}
        </button>

        <button
          onClick={() => setCurrentPage('bookings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            currentPage === 'bookings'
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <Calendar className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="font-medium">Bookings</span>}
        </button>
      </nav>

      {sidebarOpen && (
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              SA
            </div>
            <div>
              <p className="text-sm font-medium text-white">Super Admin</p>
              <p className="text-xs text-gray-400">admin@bookmyturf.com</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
