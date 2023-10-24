import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

function AddReservation() {
  const [reservationDate, setReservationDate] = useState('');
  const [status, setStatus] = useState('active');
  const [trainId, setTrainId] = useState('');
  const [trainOptions, setTrainOptions] = useState([]);
  const [passengerId, setPassengerId] = useState('');
  const [error, setError] = useState(null);

  // Fetch train options from the API
  const fetchTrainOptions = async () => {
    try {
      const apiUrl =
        'https://ticketreservationsystemapi1.azurewebsites.net/api/Train';
      const response = await axios.get(apiUrl);
      setTrainOptions(response.data);
    } catch (error) {
      setError('Error fetching train options. Please try again later.');
    }
  };

  useEffect(() => {
    fetchTrainOptions(); // Fetch train options on component mount

    // Retrieve the Passenger ID from where you store it after login (e.g., JWT claims)
    const passengerIdFromStorage = localStorage.getItem('passengerId'); // Replace with your storage method
    if (passengerIdFromStorage) {
      setPassengerId(passengerIdFromStorage);
    } else {
      console.error('Passenger ID not found. Please log in.');
    }
  }, []);

  const addReservation = async (e) => {
    e.preventDefault();

    if (!reservationDate || !status || !trainId) {
      console.error('Please fill in all the required fields.');
      return;
    }

    try {
      const apiUrl =
        'https://ticketreservationsystemapi1.azurewebsites.net/api/Reservation';
      const formData = {
        reservationDate: reservationDate,
        status: status,
        trainId: trainId,
        passengerId: passengerId,
      };

      // Include the JWT token from where you store it after login (if necessary)
      const token = localStorage.getItem('authToken'); // Replace with your storage method

      // Include the JWT token in the request headers
      const headers = token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {};

      const response = await axios.post(apiUrl, formData, { headers });

      console.log('Response:', response.data);

      // Reset form fields
      setReservationDate('');
      setStatus('active');
      setTrainId('');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="p-4">
      <h3>Add Reservation</h3>
      {error && <p>{error}</p>}
      <Form onSubmit={addReservation}>
        <Form.Group controlId="reservationDate">
          <Form.Label className="mt-3">Reservation Date</Form.Label>
          <Form.Control
            type="date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="status">
          <Form.Label className="mt-3">Status</Form.Label>
          <Row>
            <Col>
              <input
                type="radio"
                id="active"
                name="status"
                value="active"
                checked={status === 'active'}
                onChange={() => setStatus('active')}
              />
              <label htmlFor="active" className="status-label">
                Active
              </label>
            </Col>
            <Col>
              <input
                type="radio"
                id="canceled"
                name="status"
                value="canceled"
                checked={status === 'canceled'}
                onChange={() => setStatus('canceled')}
              />
              <label htmlFor="canceled" className="status-label">
                Canceled
              </label>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="trainId">
          <Form.Label className="mt-3">Train</Form.Label>
          <Form.Control
            as="select"
            value={trainId}
            onChange={(e) => setTrainId(e.target.value)}
          >
            <option value="">Select a train</option>
            {trainOptions.map((train) => (
              <option key={train.id} value={train.id}>
                {train.trainNumber}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" className="mt-3" type="submit">
          Add Reservation
        </Button>
      </Form>
    </div>
  );
}

export default AddReservation;
