// app.js

const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express1!');
});

app.listen(PORT,() => {
  console.log(`Server running at http://google.com:${PORT}/`);
});
