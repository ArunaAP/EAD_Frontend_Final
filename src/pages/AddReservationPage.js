import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import AddForm from '../components/AddForm/AddForm';
import Sidebar from '../components/Sidebar/Sidebar';
import AddTraveller from '../components/AddTraveller/AddTraveller';
import AddReservation from '../components/AddReservation/AddReservation';

const AddReservationPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Navbar />
        <AddReservation />
      </div>
    </div>
  );
};

export default AddReservationPage;
