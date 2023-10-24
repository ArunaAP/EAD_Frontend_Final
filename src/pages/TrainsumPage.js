import React from 'react';
import Table from '../components/Table/Table';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import TravellerSummery from '../components/TravellerSummery/TravellerSummery';
import ReservationSum from '../components/ReservationSum/ReservationSum';
import TrainSum from '../components/TrainSum/TrainSum';

const TrainsumPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Navbar />
        <TrainSum />
      </div>
    </div>
  );
};

export default TrainsumPage;
