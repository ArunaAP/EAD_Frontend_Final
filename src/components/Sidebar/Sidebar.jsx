import React from 'react';
import { Col, Nav, Navbar } from 'react-bootstrap';
import './sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const linkStyle = {
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 16px',
    marginBottom: '10px',
    marginRight: '10px',
    textDecoration: 'none',
  };

  const logoStyle = {
    fontSize: '24px', // Adjust the font size as needed
  };

  return (
    <Col md={2} className="cutom-blue sidebar custom-height pt-2">
      <Nav className="flex-column">
        <Link to="/dashboard">
          <Navbar.Brand
            className="font-weight-900 text-center text-white p-5"
            style={logoStyle}
          >
            SeatSway
          </Navbar.Brand>
        </Link>
        <p className="h5 text-white p-2 mb-5"></p>

        <Link
          to="/travellersum"
          style={
            window.location.pathname === '/travellersum'
              ? { ...linkStyle, backgroundColor: 'white', color: '#00abe4' }
              : linkStyle
          }
        >
          Traveller
        </Link>

        <Link
          to="/reservationsum"
          style={
            window.location.pathname === '/reservationsum'
              ? { ...linkStyle, backgroundColor: 'white', color: '#00abe4' }
              : linkStyle
          }
        >
          Reservstion
        </Link>

        <Link
          to="/trainsum"
          style={
            window.location.pathname === '/trainsum'
              ? { ...linkStyle, backgroundColor: 'white', color: '#00abe4' }
              : linkStyle
          }
        >
          Trains
        </Link>
      </Nav>
    </Col>
  );
};

export default Sidebar;
