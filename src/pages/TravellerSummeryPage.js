import React from 'react';
import Table from '../components/Table/Table';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import TravellerSummery from '../components/TravellerSummery/TravellerSummery';

const TravellerSummeryPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Navbar />
        <TravellerSummery />
      </div>
    </div>
  );
};

export default TravellerSummeryPage;
