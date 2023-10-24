import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateForm from '../UpdateForm/UpdateForm';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Table() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get('https://ticketbooking20231010090838.azurewebsites.net/api/employee')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        setError('Error fetching employees. Please try again later.');
      });
  };

  useEffect(() => {
    fetchData(); // Fetch employee data on component mount
  }, []);

  useEffect(() => {
    // Check if a selectedEmployee is available and navigate
    if (selectedEmployee) {
      navigate('/update');
    }
  }, [selectedEmployee, navigate]);

  const handleUpdate = (employeeId) => {
    const employeeToUpdate = employees.find(
      (employee) => employee.id === employeeId
    );
    setSelectedEmployee(employeeToUpdate);
  };

  const handleDelete = (employeeId) => {
    axios
      .delete(
        `https://ticketbooking20231010090838.azurewebsites.net/api/employee/${employeeId}`
      )
      .then((response) => {
        console.log(`Employee with ID ${employeeId} deleted successfully`);
        // After a successful delete, refresh the data
        fetchData();
      })
      .catch((error) => {
        console.error(`Error deleting employee with ID ${employeeId}:`, error);
      });
  };

  return (
    <div>
      <h3>Employee List</h3>
      {error && <p>{error}</p>}
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Employee Role</th>
            <th scope="col">Gender</th>
            <th scope="col">Age</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <th scope="row">{index + 1}</th>
              <td>{employee.name}</td>
              <td>{employee.empRole}</td>
              <td>{employee.gender}</td>
              <td>{employee.age}</td>
              <td>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: '#00abe4' }}
                  onClick={() => handleUpdate(employee.id)}
                >
                  Update
                </Button>
                <Button onClick={() => handleDelete(employee.id)}>
                  Delete
                </Button>
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
