import React, { useState } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import axios from 'axios';

function AddTrain() {
  const [trainNumber, setTrainNumber] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [isCanceled, setIsCanceled] = useState(false);

  const addTrain = async (e) => {
    e.preventDefault();

    if (!trainNumber || !departureTime || !capacity) {
      console.error('Please fill in all the fields.');
      return;
    }

    try {
      const apiUrl =
        'https://ticketreservationsystemapi1.azurewebsites.net/api/Train';

      const formData = {
        trainNumber: trainNumber,
        departureTime: departureTime,
        capacity: capacity,
        status: isCanceled ? 'canceled' : 'not canceled',
      };

      const response = await axios.post(apiUrl, formData);

      console.log('Response:', response.data);

      // Clear the form fields
      setTrainNumber('');
      setDepartureTime('');
      setCapacity(0);
      setIsCanceled(false);

      // You can add any navigation logic here
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Form className="p-5" onSubmit={addTrain}>
      <h3>Add Train</h3>
      <Form.Group controlId="trainNumber">
        <Form.Label>Train Number</Form.Label>
        <Form.Control
          className="custom-input mb-3"
          type="text"
          placeholder="Enter train number"
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="departureTime">
        <Form.Label>Departure Time</Form.Label>
        <Form.Control
          className="custom-input mb-3"
          type="datetime-local"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="capacity">
        <Form.Label>Capacity</Form.Label>
        <Form.Control
          className="custom-input mb-3"
          type="number"
          placeholder="Enter capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </Form.Group>

      <FormGroup controlId="isCanceled">
        <Form.Check
          inline
          label="Not Canceled"
          type="radio"
          id="notCanceled"
          value={false}
          checked={!isCanceled}
          onChange={() => setIsCanceled(false)}
        />
        <Form.Check
          inline
          label="Canceled"
          type="radio"
          id="canceled"
          value={true}
          checked={isCanceled}
          onChange={() => setIsCanceled(true)}
        />
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

export default AddTrain;
