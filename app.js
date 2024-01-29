// app.js

const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express111!');
});

app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
