import React, { useState } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import './addTraveller.css';
import axios from 'axios';

function AddTraveller() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState('');

  const addTraveller = async (e) => {
    e.preventDefault();

    if (!username || !password || !fullName || !status) {
      console.error('Please fill in all the fields.');
      return;
    }

    try {
      const apiUrl =
        'https://ticketreservationsystemapi1.azurewebsites.net/api/TravellerUser/register';

      const formData = {
        username: username,
        password: password,
        fullName: fullName,
        status: status,
      };

      const response = await axios.post(apiUrl, formData);

      console.log('Response:', response.data);

      // Clear the form fields
      setUsername('');
      setPassword('');
      setFullName('');
      setStatus('');

      // Navigate to '/travellersum'
      window.location.href = '/travellersum';
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Form className="p-5" onSubmit={addTraveller}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          className="custom-input mb-3"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className="custom-input mb-3"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="fullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          className="custom-input mb-3"
          type="text"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </Form.Group>

      <FormGroup controlId="status">
        <Form.Label>Status</Form.Label>
        <div>
          <Form.Check
            inline
            label="Active"
            type="radio"
            id="active"
            value="Active"
            checked={status === 'Active'}
            onChange={(e) => setStatus(e.target.value)}
          />
          <Form.Check
            inline
            label="Inactive"
            type="radio"
            id="inactive"
            value="Inactive"
            checked={status === 'Inactive'}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </FormGroup>

      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          type="submit"
          style={{ backgroundColor: '#00abe4' }}
        >
          ADD
        </Button>
      </div>
    </Form>
  );
}

export default AddTraveller;
