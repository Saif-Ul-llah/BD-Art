'use client'
import React, { useState } from 'react';
import AdminSideMenu from '../components/adminSideMenu';

const Dashboard = () => {
 
  return (
    <div>
      <AdminSideMenu />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        Details Come here about Dashboard !
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
