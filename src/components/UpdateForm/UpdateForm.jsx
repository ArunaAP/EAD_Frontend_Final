import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const UpdateForm = ({ selectedTrain, closeUpdateModal }) => {
  const [trainData, setTrainData] = useState({
    trainNumber: '',
    departureTime: '',
    capacity: 0,
    status: '',
  });

  useEffect(() => {
    if (selectedTrain) {
      setTrainData({
        trainNumber: selectedTrain.trainNumber || '',
        departureTime: selectedTrain.departureTime || '',
        capacity: selectedTrain.capacity || 0,
        status: selectedTrain.status || '',
      });
    }
  }, [selectedTrain]);

  const updateTrain = async (e) => {
    e.preventDefault();

    if (
      !trainData.trainNumber ||
      !trainData.departureTime ||
      !trainData.capacity
    ) {
      console.error('Please fill in all the fields.');
      return;
    }

    try {
      const trainId = selectedTrain.id; // Replace 'id' with the actual ID property
      const apiUrl = `https://ticketreservationsystemapi1.azurewebsites.net/api/Train/${trainId}`;

      const response = await axios.put(apiUrl, trainData);

      console.log('Response:', response.data);

      // Close the update modal
      closeUpdateModal();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={updateTrain}>
      <h3>Update Train</h3>
      <Form.Group controlId="trainNumber">
        <Form.Label>Train Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter train number"
          name="trainNumber"
          value={trainData.trainNumber}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="departureTime">
        <Form.Label>Departure Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="departureTime"
          value={trainData.departureTime}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="capacity">
        <Form.Label>Capacity</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter capacity"
          name="capacity"
          value={trainData.capacity}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter status"
          name="status"
          value={trainData.status}
          onChange={handleChange}
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button
          type="submit"
          variant="primary"
          style={{ backgroundColor: '#00abe4' }}
        >
          Update
        </Button>
      </div>
    </Form>
  );
};

export default UpdateForm;
