import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './addForm.css';
import axios from 'axios';

function MyForm() {
  const [name, setName] = useState('');
  const [empRole, setEmpRole] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const addEmployee = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if any of the form fields are empty
    if (!name || !empRole || !gender || !age) {
      console.error('Please fill in all the fields.');
      return;
    }

    try {
      const apiUrl =
        'https://ticketbooking20231010090838.azurewebsites.net/api/employee';

      // Prepare the form data
      const formData = {
        name: name,
        empRole: empRole,
        gender: gender,
        age: age,
      };

      // Send a POST request with the form data
      const response = await axios.post(apiUrl, formData);

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Form className="p-5" onSubmit={addEmployee}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          className="custom-input mb-3"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="empRole">
        <Form.Label>Employee Role</Form.Label>
        <Form.Control
          className="custom-input mb-3"
          type="text"
          placeholder="Enter employee role"
          value={empRole}
          onChange={(e) => setEmpRole(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="gender">
        <Form.Label>Gender</Form.Label>
        <Form.Control
          className="custom-input mb-3"
          type="text"
          placeholder="Enter gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="age">
        <Form.Label>Age</Form.Label>
        <Form.Control
          className="custom-input mb-3"
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Form.Group>

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

export default MyForm;
