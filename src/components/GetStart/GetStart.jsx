// GetStarted.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <h1 className="text-center mb-4">Get Started</h1>
      <div className="d-grid gap-3">
        <Link to="/login">
          <Button variant="primary" size="lg">
            BackOffice User
          </Button>
        </Link>
        <Link to="/agentlogin">
          <Button variant="secondary" size="lg">
            Travel Agent User
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default GetStarted;
