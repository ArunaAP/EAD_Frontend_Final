import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import UpdateForm from '../UpdateForm/UpdateForm';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Table() {
  const [travellers, setTravellers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [userRole, setUserRole] = useState(''); // State to store user role
  const navigate = useNavigate();

  // console.log(userRole);

  useEffect(() => {
    // Get the user's role from localStorage
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }

    fetchData(); // Fetch employee data on component mount
  }, []);

  useEffect(() => {
    // Check if a selectedEmployee is available and navigate
    if (selectedEmployee) {
      navigate('/update');
    }
  }, [selectedEmployee, navigate]);

  const handleActivate = (travelerId) => {
    if (travelerId) {
      axios
        .put(
          `https://ticketreservationsystemapi1.azurewebsites.net/api/TravellerUser/activate/${travelerId}`,
          { _id: travelerId }
        )
        .then((response) => {
          console.log(`Traveller with ID ${travelerId} activated successfully`);
          // After a successful activation, refresh the data
          fetchData();
          console.log('Activating traveller with _id:', travelerId);
        })
        .catch((error) => {
          console.error(
            `Error activating traveller with ID ${travelerId}:`,
            error
          );
        });
    }
  };

  const handleDeactivate = (travelerId) => {
    if (travelerId) {
      axios
        .put(
          `https://ticketreservationsystemapi1.azurewebsites.net/api/TravellerUser/deactivate/${travelerId}`,
          { _id: travelerId }
        )
        .then((response) => {
          console.log(
            `Traveller with ID ${travelerId} deactivated successfully`
          );
          // After a successful deactivation, refresh the data
          fetchData();
        })
        .catch((error) => {
          console.error(
            `Error deactivating traveller with ID ${travelerId}:`,
            error
          );
        });
    }
  };

  const fetchData = () => {
    axios
      .get(
        'https://ticketreservationsystemapi1.azurewebsites.net/api/TravellerUser'
      )
      .then((response) => {
        setTravellers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        setError('Error fetching employees. Please try again later.');
      });
  };

  return (
    <div>
      <h3>Traveller List</h3>
      <Link to={'/addTraveller'}>
        <Button variant="primary" style={{ marginLeft: '10px' }}>
          Add Traveller
        </Button>
      </Link>
      {error && <p>{error}</p>}
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Username</th>
            <th scope="col">Fullname</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {travellers.map((traveller, index) => (
            <tr key={traveller.id}>
              <th scope="row">{index + 1}</th>
              <td>{traveller.username}</td>
              <td>{traveller.fullName}</td>
              <td>{traveller.status}</td>
              <td>
                {userRole !== 'TRAVEL_AGENT' && (
                  // Render buttons only if the user is not a Travel Agent
                  <>
                    <Button
                      variant="success"
                      style={{ backgroundColor: '#28a745', marginLeft: '10px' }}
                      onClick={() => handleActivate(traveller.id)}
                    >
                      Activate
                    </Button>
                    <Button
                      variant="danger"
                      style={{ marginLeft: '10px' }}
                      onClick={() => handleDeactivate(traveller.id)}
                    >
                      Deactivate
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployee && <UpdateForm selectedEmployee={selectedEmployee} />}
    </div>
  );
}

export default Table;
