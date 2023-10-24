import React, { useState, useEffect } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import axios from 'axios';

function UpdateTrain({ trainId }) {
  const [trainNumber, setTrainNumber] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    // Fetch the train data for the given trainId
    const fetchTrainData = async () => {
      try {
        const apiUrl = `https://ticketreservationsystemapi1.azurewebsites.net/api/Train/${trainId}`;
        const response = await axios.get(apiUrl);
        const trainData = response.data;

        setTrainNumber(trainData.trainNumber);
        setDepartureTime(trainData.departureTime);
        setCapacity(trainData.capacity);
        setIsCanceled(trainData.status.toLowerCase() === 'canceled');
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    };

    fetchTrainData(); // Fetch train data on component mount
  }, [trainId]);

  const updateTrain = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `https://ticketreservationsystemapi1.azurewebsites.net/api/Train/${trainId}`;

      const formData = {
        trainNumber: trainNumber,
        departureTime: departureTime,
        capacity: capacity,
        status: isCanceled ? 'canceled' : 'not canceled',
      };

      const response = await axios.put(apiUrl, formData);

      console.log('Train updated successfully:', response.data);

      // You can add any navigation logic here
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Form className="p-5" onSubmit={updateTrain}>
      <h3>Update Train</h3>
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
          UPDATE
        </Button>
      </div>
    </Form>
  );
}

export default UpdateTrain;
