// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to read JSON in requests
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('📢 Welcome to the Community Feedback API!');
});

// Temporary in-memory storage
let reports = [];

// POST route to submit a report
app.post('/report', (req, res) => {
  const { title, description, location } = req.body;

  if (!title || !description || !location) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newReport = {
    id: reports.length + 1,
    title,
    description,
    location,
    timestamp: new Date().toISOString(),
  };

  reports.push(newReport);
  res.status(201).json({ message: 'Report submitted successfully.', report: newReport });
});

// GET route to view all reports
app.get('/reports', (req, res) => {
  res.json(reports);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
