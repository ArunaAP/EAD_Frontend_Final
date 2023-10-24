import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import UpdateForm from '../UpdateForm/UpdateForm';
import { Link, useNavigate } from 'react-router-dom';

function TrainSum() {
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get('https://ticketreservationsystemapi1.azurewebsites.net/api/Train')
      .then((response) => {
        setTrains(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trains:', error);
        setError('Error fetching trains. Please try again later.');
      });
  };

  useEffect(() => {
    fetchData(); // Fetch train data on component mount
  }, []);

  const handleUpdate = (trainId) => {
    const selectedTrain = trains.find((train) => train.id === trainId);
    setSelectedTrain(selectedTrain);
    setShowUpdateModal(true); // Open the update modal
  };

  const handleCancel = (trainId) => {
    axios
      .put(
        `https://ticketreservationsystemapi1.azurewebsites.net/api/Train/cancel/${trainId}`
      )
      .then((response) => {
        console.log(`Train with ID ${trainId} canceled successfully`);
        fetchData();
      })
      .catch((error) => {
        console.error(`Error canceling train with ID ${trainId}:`, error);
      });
  };

  const handleActivate = (trainId) => {
    axios
      .put(
        `https://ticketreservationsystemapi1.azurewebsites.net/api/Train/activate/${trainId}`
      )
      .then((response) => {
        console.log(`Train with ID ${trainId} activated successfully`);
        fetchData();
      })
      .catch((error) => {
        console.error(`Error activating train with ID ${trainId}:`, error);
      });
  };

  const handleDelete = (trainId) => {
    axios
      .delete(
        `https://ticketreservationsystemapi1.azurewebsites.net/api/Train/${trainId}`
      )
      .then((response) => {
        console.log(`Train with ID ${trainId} deleted successfully`);
        fetchData();
      })
      .catch((error) => {
        console.error(`Error deleting train with ID ${trainId}:`, error);
      });
  };

  const closeUpdateModal = () => setShowUpdateModal(false);

  return (
    <div>
      <h3>Trains</h3>
      {error && <p>{error}</p>}
      <Link to={'/addTrain'}>
        <Button variant="primary" style={{ marginLeft: '10px' }}>
          Add Train
        </Button>
      </Link>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">trainNumber</th>
            <th scope="col">departureTime</th>
            <th scope="col">capacity</th>
            <th scope="col">status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train, index) => (
            <tr key={train.id}>
              <th scope="row">{index + 1}</th>
              <td>{train.trainNumber}</td>
              <td>{train.departureTime}</td>
              <td>{train.capacity}</td>
              <td>{train.status}</td>
              <td>
                <Button
                  variant="primary"
                  style={{ marginRight: '10px' }}
                  onClick={() => handleUpdate(train.id)}
                >
                  Update
                </Button>
                {train.status === 'CANCELLED' ? (
                  <Button
                    variant="success"
                    style={{ marginRight: '10px' }}
                    onClick={() => handleActivate(train.id)}
                  >
                    Activate
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    style={{ marginRight: '10px' }}
                    onClick={() => handleCancel(train.id)}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  variant="danger"
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleDelete(train.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update modal */}
      <Modal show={showUpdateModal} onHide={closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Train</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateForm
            selectedTrain={selectedTrain}
            closeUpdateModal={closeUpdateModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeUpdateModal}>
            Close
          </Button>
          {/* You can add a save button here in the modal footer */}
        </Modal.Footer>
      </Modal>

      {/* Form can be placed here */}
    </div>
  );
}

export default TrainSum;
