const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Timestamp Microservice'));
app.get('/api/timestamp/:date_string?', (req, res) => {
  const dateString = req.params.date_string;
  const regex = /^(\d{4})\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g;
  // Check if the date string was empty
  if (typeof dateString === 'undefined') {
    res.send(new Date());
  }
  // Check if the string was a valid date
  if (regex.test(dateString)) {
    const date = new Date(dateString);
    res.json({"unix": date.getTime(), "utc": date.toUTCString()});
  } else {
    res.json({"error": "Invalid Date"});
  }
});

app.listen(3000, () => console.log('Listening on port 3000!'));