// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to read JSON in requests
app.use(express.json());
app.use(express.static('public'));  // Serve static files from the "public" folder

// Temporary in-memory storage
let reports = [];

// Home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// POST route to submit a report
app.post('/report', (req, res) => {
  const { title, description, location, category } = req.body;

  if (!title || !description || !location || !category) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newReport = {
    id: reports.length + 1,
    title,
    description,
    location,
    category,
    timestamp: new Date().toISOString(),
  };

  reports.push(newReport);
  res.status(201).json({ message: 'Report submitted successfully.', report: newReport });
});

// GET route to view all reports
app.get('/reports', (req, res) => {
  const { category, location, keyword } = req.query;

  let filteredReports = reports;

  // Filter by category
  if (category) {
    filteredReports = filteredReports.filter(report => report.category === category);
  }

  // Filter by location
  if (location) {
    filteredReports = filteredReports.filter(report => report.location.includes(location));
  }

  // Filter by keyword in description
  if (keyword) {
    filteredReports = filteredReports.filter(report => report.description.includes(keyword));
  }

  res.json(filteredReports);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
