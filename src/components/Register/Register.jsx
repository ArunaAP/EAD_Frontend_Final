import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Create a request body with full name, username, and password
    const requestBody = {
      fullName: fullName,
      username: username,
      password: password,
    };

    try {
      const response = await fetch(
        'https://ticketreservationsystemapi1.azurewebsites.net/api/BackOfficeUser/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        navigate('/login');
        // Successful registration, you can handle it as needed
        console.log('Registration successful');
      } else {
        // Handle registration failure
        const errorData = await response.json();
        setSignupError(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setSignupError('An error occurred while trying to register');
    }
  };

  return (
    <Container style={{ maxWidth: '50%', paddingTop: '150px' }}>
      <Card className="d-flex flex-row align-items-center">
        <Card.Img
          variant="top"
          src="/Rectangle 5.svg"
          style={{ maxWidth: '50%', height: 'auto' }}
          className="flex-fill"
        />

        <div className="w-50">
          <Card.Body className="d-flex flex-column align-items-center justify-content-center">
            <Card.Title className="h1 text-center font-weight-bold">
              Register
            </Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {signupError && <div className="text-danger">{signupError}</div>}

              <Button
                variant="primary"
                type="submit"
                style={{ width: '100%' }}
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </Form>
          </Card.Body>
        </div>
      </Card>
    </Container>
  );
}

export default Register;
