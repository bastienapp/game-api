const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.PORT;

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Connected on port ${port}`);
});
