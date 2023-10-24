import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import AddForm from '../components/AddForm/AddForm';
import Sidebar from '../components/Sidebar/Sidebar';
import AddTraveller from '../components/AddTraveller/AddTraveller';

const AddTravellerPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Navbar />
        <AddTraveller />
      </div>
    </div>
  );
};

export default AddTravellerPage;
