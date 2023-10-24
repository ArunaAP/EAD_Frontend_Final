import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateForm from '../UpdateForm/UpdateForm';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function ReservationSum() {
  const [travellers, setTravellers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(
        'https://ticketreservationsystemapi1.azurewebsites.net/api/Reservation'
      )
      .then((response) => {
        setTravellers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reservations:', error);
        setError('Error fetching reservations. Please try again later.');
      });
  };

  useEffect(() => {
    fetchData(); // Fetch reservation data on component mount
  }, []);

  const handleUpdate = (reservationId) => {
    // Find the selected reservation from the list
    const selectedRes = travellers.find(
      (reservation) => reservation.id === reservationId
    );
    setSelectedReservation(selectedRes);
  };

  const handleCancel = (reservationId) => {
    axios
      .put(
        `https://ticketreservationsystemapi1.azurewebsites.net/api/Reservation/cancel/${reservationId}`
      )
      .then((response) => {
        console.log(
          `Reservation with ID ${reservationId} canceled successfully`
        );
        // After a successful cancellation, refresh the data
        fetchData();
      })
      .catch((error) => {
        console.error(
          `Error canceling reservation with ID ${reservationId}:`,
          error
        );
      });
  };

  const handleDelete = (reservationId) => {
    axios
      .delete(
        `https://ticketreservationsystemapi1.azurewebsites.net/api/Reservation/${reservationId}`
      )
      .then((response) => {
        console.log(
          `Reservation with ID ${reservationId} deleted successfully`
        );
        // After a successful deletion, refresh the data
        fetchData();
      })
      .catch((error) => {
        console.error(
          `Error deleting reservation with ID ${reservationId}:`,
          error
        );
      });
  };

  useEffect(() => {
    // Check if a selectedReservation is available and navigate
    if (selectedReservation) {
      navigate('/update');
    }
  }, [selectedReservation, navigate]);

  return (
    <div>
      <h3>Reservations</h3>
      {error && <p>{error}</p>}
      <Link to={'/addReservation'}>
        <Button variant="primary" style={{ marginLeft: '10px' }}>
          Add Reservation
        </Button>
      </Link>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">status</th>
            <th scope="col">passengerId</th>
            <th scope="col">trainId</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {travellers.map((traveller, index) => (
            <tr key={traveller.id}>
              <th scope="row">{index + 1}</th>
              <td>{traveller.reservationDate}</td>
              <td>{traveller.status}</td>
              <td>{traveller.passengerId}</td>
              <td>{traveller.trainId}</td>
              <td>
                <Button
                  variant="primary"
                  style={{ marginRight: '10px' }}
                  onClick={() => handleUpdate(traveller.id)}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  style={{ marginRight: '10px' }}
                  onClick={() => handleCancel(traveller.id)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleDelete(traveller.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReservation && (
        <UpdateForm selectedReservation={selectedReservation} />
      )}
    </div>
  );
}

export default ReservationSum;
