import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [employees, setEmployee] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    id: null, // Include ID for editing
    name: '',
    surname: '',
    age: '',
    email: ''
  });
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/employees", { method: 'GET' })
      .then((response) => response.json())
      .then((data) => setEmployee(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const addEmployee = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployee([...employees, data]);
        setNewEmployee({ id: null, name: '', surname: '', age: '', email: '' });
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/employees/${newEmployee.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((updatedEmployee) => {
        setEmployee(
          employees.map((employee) =>
            employee.id === updatedEmployee.id ? updatedEmployee : employee
          )
        );
        setNewEmployee({ id: null, name: '', surname: '', age: '', email: '' });
        setUpdating(false);
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  const handleDelete = (id) => {
    setLoading(true);
    fetch(`http://localhost:3001/employees/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setEmployee(employees.filter((employee) => employee.id !== id));
        alert("Delete successful");
      })
      .catch((err) => console.error("Error deleting employee:", err))
      .finally(() => setLoading(false));
  };

  const startEditing = (employee) => {
    setNewEmployee(employee); // Preload employee data into the form
    setUpdating(true);
  };

  const cancelEdit = () => {
    setNewEmployee({ id: null, name: '', surname: '', age: '', email: '' });
    setUpdating(false);
  };

  return (
    <>
      {updating ? (
        <form onSubmit={handleUpdate}>
          <h1>Edit Employee</h1>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              name="surname"
              value={newEmployee.surname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              value={newEmployee.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Update Employee</button>
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <form onSubmit={addEmployee}>
          <h1>Add Employee</h1>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              name="surname"
              value={newEmployee.surname}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              value={newEmployee.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Employee</button>
        </form>
      )}

      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} {employee.surname} ({employee.age}) {employee.email}
            <button onClick={() => handleDelete(employee.id)} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </button>
            <button onClick={() => startEditing(employee)}>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
