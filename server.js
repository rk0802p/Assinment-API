const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./messages.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');

    db.run(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        message TEXT NOT NULL
      )
    `);
  }
});

// API endpoint to save message data
app.post('/api/messages', (req, res) => {
  const { date, time, message } = req.body;

  // Validate input
  if (!date || !time || !message) {
    return res.status(400).json({ error: 'Missing required fields: date, time, message' });
  }

  // Insert data into the database
  const query = `INSERT INTO messages (date, time, message) VALUES (?, ?, ?)`;
  db.run(query, [date, time, message], function (err) {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.status(500).json({ error: 'Failed to save message' });
    }
    res.status(201).json({
      id: this.lastID,
      date,
      time,
      message
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});