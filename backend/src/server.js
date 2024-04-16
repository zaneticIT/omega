// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3002; // Choose any port you prefer

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'root',
  database: 'omega'
});

// Connect to MySQL
connection.connect(error => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
    return;
  }
  console.log('Connected to MySQL database');
});

//Define routes
app.get('/api/ugovori', (req, res) => {
  connection.query('SELECT * FROM kupoprodajni_ugovori', (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/artikli', (req, res) => {
    connection.query('SELECT * FROM artikli', (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
