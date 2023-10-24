import React from 'react';
import Navbar from '../components/Navbar/Navbar';
// import AddForm from '../components/AddForm/AddForm';
import Sidebar from '../components/Sidebar/Sidebar';
import AddTrain from '../components/AddTrain/AddTrain';

const AddTrainPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Navbar />
        <AddTrain />
      </div>
    </div>
  );
};

export default AddTrainPage;
