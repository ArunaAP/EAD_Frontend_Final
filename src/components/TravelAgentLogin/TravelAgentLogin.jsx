import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';

function TravelAgentLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestBody = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(
        'https://ticketreservationsystemapi1.azurewebsites.net/api/TravelAgentUser/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        // Extract the access token from the response
        const data = await response.json();
        const { token, role } = data;

        // Store the token in localStorage or a secure location
        localStorage.setItem('accessTokenAgent', token);
        localStorage.setItem('userRole', role);

        // Redirect to '/dashboard'
        navigate('/dashboard');
        console.log('Login success');
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('An error occurred while trying to log in');
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
              Travel Agent Login
            </Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
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
              {loginError && <div className="text-danger">{loginError}</div>}
              <Button
                variant="primary"
                type="submit"
                style={{ width: '100%' }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <p>
                Don't have an account? <Link to={'/register'}>Signup</Link>
              </p>
            </Form>
          </Card.Body>
        </div>
      </Card>
    </Container>
  );
}

export default TravelAgentLogin;
