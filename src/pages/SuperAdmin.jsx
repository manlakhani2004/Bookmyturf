import Sidebar from "../components/super_admin/layout/Sidebar";
import ApproveAdmin from "../components/super_admin/pages/ApproveAdmin";
import Dashboard from "../components/super_admin/pages/Dashboard";
import React, { useState } from 'react';

export default function SuperAdmin()
{
      const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

    return(
         <div className="flex h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {currentPage === 'dashboard' ? <Dashboard /> : <ApproveAdmin />}
        </div>
      </main>
    </div>
    )
}