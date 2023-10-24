import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import '../../index.css';
import { Link } from 'react-router-dom';

function getGreeting() {
  const currentTime = new Date().getHours();
  if (currentTime >= 5 && currentTime < 12) {
    return 'Good morning';
  } else if (currentTime >= 12 && currentTime < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

function Dashboard() {
  const cardStyle = {
    minHeight: '240px',
  };

  return (
    <Container className="dashboard-container">
      <h3 className="h4 text-center pt-5 pb-5">{getGreeting()}!</h3>
      <Row className="pt-5">
        <Col md={3}>
          <Link to="/travellersum">
            <Card style={cardStyle}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title className="text-center">
                  Traveler Management
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3}>
          <Link to="/reservationsum">
            <Card style={cardStyle}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title className="text-center">
                  Reservstion Management
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col md={3}>
          <Card style={cardStyle}>
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title className="text-center">
                Ticket Booking Management
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Link to="/trainsum">
            <Card style={cardStyle}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title className="text-center">
                  Train Management
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
