import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import DashboardTab from './DashboardTab';
import LocationsTab from './LocationsTab';
import AddLocationModal from './AddLocationModal';
import BackgroundElements from './common/BackgroundElements';
import { useLocations } from './hooks/useLocations';
import BookingsTable from './BookingsTable';
import { Logout } from '../../../services/operations/auth';

import './styles/animations.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    locations,
    loading,
    addLocation,
    fetchLocations
  } = useLocations();

  // 🔴 LOGOUT HANDLER
  const handleLogout = () => {
    dispatch(Logout(navigate));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardTab
            locations={locations}
            onAddLocationClick={() => setShowAddLocationModal(true)}
          />
        );

      case 'locations':
        return (
          <LocationsTab
            locations={locations}
            loading={loading}
            onAddLocationClick={() => setShowAddLocationModal(true)}
            onRefresh={fetchLocations}
          />
        );

      case 'bookings':
        return <BookingsTable />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <BackgroundElements />

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={activeTab}
        setCurrentPage={setActiveTab}
      />

      {/* MAIN CONTENT */}
      <div
        className={`transition-all duration-300 p-8 w-full ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* 🔵 TOP BAR WITH LOGOUT */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {renderActiveTab()}
      </div>

      {/* ADD LOCATION MODAL */}
      {showAddLocationModal && (
        <AddLocationModal
          onClose={() => setShowAddLocationModal(false)}
          onAdd={addLocation}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
