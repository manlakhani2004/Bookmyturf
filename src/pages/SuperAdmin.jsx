import Sidebar from "../components/super_admin/layout/Sidebar";
import Bookings from "../components/super_admin/pages/Bookings";
import Dashboard from "../components/super_admin/pages/Dashboard";
import React, { useState } from 'react';

export default function SuperAdmin()
{
      const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

    return(
         <div className="flex h-screen pt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {currentPage === 'dashboard' ? <Dashboard /> : <Bookings />}
        </div>
      </main>
    </div>
    )
}