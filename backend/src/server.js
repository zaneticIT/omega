// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const port = 3002;

function convertDate(date) {
  return new Date(date)
    .toLocaleString("en-CA", {
      dateStyle: "short",
    })
    .replace(/\//gi, "-");
}

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "root",
  database: "omega",
});

// Connect to MySQL
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
    return;
  }
  console.log("Connected to MySQL database");
});

//Define routes

//GET all ugovori
app.get("/api/ugovori", (req, res) => {
  connection.query("SELECT * FROM kupoprodajni_ugovori", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

//GET id ugovor
app.get("/api/ugovor/:id", (req, res) => {
  const id = parseInt(req.params.id);
  connection.query(
    "SELECT * FROM kupoprodajni_ugovori WHERE id = " + id,
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(results);
    }
  );
});

//GET all artikli
app.get("/api/artikli", (req, res) => {
  connection.query("SELECT * FROM artikli", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

//GET id artikl
app.get("/api/artikl/:id", (req, res) => {
  const id = parseInt(req.params.id);
  connection.query(
    "SELECT * FROM artikli WHERE ugovor_id = " + id,
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(results);
    }
  );
});

//POST ugovori
app.post("/api/add/ugovori", (req, res) => {
  const inputs = req.body;
  inputs.datum_akonotacije = convertDate(inputs.datum_akonotacije);
  inputs.rok_isporuke = convertDate(inputs.rok_isporuke);
  const query = `INSERT INTO kupoprodajni_ugovori (kupac, broj_ugovora, datum_akonotacije, rok_isporuke, status) VALUES ('${inputs.kupac}', '${inputs.broj_ugovora}', '${inputs.datum_akonotacije}', '${inputs.rok_isporuke}', '${inputs.status}')`;
  connection.query(query, inputs, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Failed to add data to the database" });
      return;
    }
    res.status(200).json({ message: "Data added successfully" });
  });
});

//DELETE ugovori
app.delete("/api/remove/ugovor/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const query = `DELETE FROM kupoprodajni_ugovori WHERE id = ` + id;
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.status(200).json({ message: "Data removed successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
