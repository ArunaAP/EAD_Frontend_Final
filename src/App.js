import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import EmployeeSummery from './pages/EmployeeSummery';
import EmployeeAdd from './pages/EmployeeAdd';
// import UpdateForm from './components/UpdateForm/UpdateForm';
import Register from './components/Register/Register';
import GetStarted from './components/GetStart/GetStart';
import TravelAgentLogin from './components/TravelAgentLogin/TravelAgentLogin';
import TravellerSummeryPage from './pages/TravellerSummeryPage';
import ReservationSumPage from './pages/ReservationSumPage';
import TrainsumPage from './pages/TrainsumPage';
import AddTravellerPage from './pages/AddTravellerPage';
import AddReservationPage from './pages/AddReservationPage';
import AddTrainPage from './pages/AddTrainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agentlogin" element={<TravelAgentLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/travellersum" element={<TravellerSummeryPage />} />
        <Route path="/reservationsum" element={<ReservationSumPage />} />
        <Route path="/trainsum" element={<TrainsumPage />} />
        <Route path="/add" element={<EmployeeAdd />} />
        <Route path="/addTraveller" element={<AddTravellerPage />} />
        <Route path="/addReservation" element={<AddReservationPage />} />
        <Route path="/addTrain" element={<AddTrainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
