const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employeesystem',
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected successfully');
  }
});

app.get('/employees', (req, res) => {
  const sql = 'SELECT * FROM employees';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetch data:', err);
      res.status(500).send('Error fetching data');
    } else {
      res.json(result);
    }
  });
});

app.post('/employees', (req, res) => {
  const { name, surname, age, email } = req.body;
  const sql = 'INSERT INTO employees (name, surname, age, email) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, surname, age, email], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('An error occurred while adding the employee.');
    } else {
      console.log('Employee added successfully!');
      res.status(201).json({ id: result.insertId, name, surname, age, email });
    }
  });
});

app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM employees WHERE id = ?'; //using parameterized query to prevent sql injection.
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting user');
    } else {
      res.send('User deleted successfully');
    }
  });
});

app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, surname, age, email } = req.body;
  const sql = 'UPDATE employees SET name = ?, surname = ?, age = ?, email = ? WHERE id = ?'; //using parameterized query to prevent sql injection.
  db.query(sql, [name, surname, age, email, id], (err, result) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).send('Error updating employee');
    } else {
      res.json({ id, name, surname, age, email });
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Start server on port ${PORT}`);
});