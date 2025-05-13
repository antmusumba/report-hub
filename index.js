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
      category,  // Added category
      timestamp: new Date().toISOString(),
    };
  
    reports.push(newReport);
    res.status(201).json({ message: 'Report submitted successfully.', report: newReport });
  });
  
  // GET route to view all reports
  app.get('/reports', (req, res) => {
    const { category } = req.query;
  
    // Filter reports by category if provided
    if (category) {
      return res.json(reports.filter(report => report.category === category));
    }
  
    res.json(reports);
  });
  