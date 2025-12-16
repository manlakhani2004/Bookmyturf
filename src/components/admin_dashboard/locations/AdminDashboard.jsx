import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardTab from './DashboardTab';
import LocationsTab from './LocationsTab';
import AddLocationModal from './AddLocationModal';
import BackgroundElements from './common/BackgroundElements';
import { useLocations } from './hooks/useLocations';
import './styles/animations.css';
import BookingsTable from './BookingsTable';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  
  const {
    locations,
    loading,
    addLocation,
    fetchLocations
  } = useLocations();

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
      default:
        return (
          <div className="text-center py-20 animate-fadeIn">
            <BookingsTable/>  
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <BackgroundElements />
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <div className="ml-64 p-8 relative z-10">
        {renderActiveTab()}
      </div>

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
