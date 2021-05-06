const express = require('express');
require('dotenv').config();
const app = express();
const connection = require('./config/mysql');

const port = process.env.PORT;

app.get('/games', function (request, response) {
  connection
    .promise()
    .query('SELECT * FROM game')
    .then(([results]) => response.status(200).json(results))
    .catch((error) => response.status(500).send(error));
});

app.get('/games/:id', function (request, response) {
  const { id } = request.params;
  connection
    .promise()
    .query('SELECT * FROM game WHERE id = ?', [id])
    .then(([results]) => {
      if (results.length === 0) {
        response.sendStatus(404);
      } else {
        response.status(200).json(results)
      }
    })
    .catch((error) => response.status(500).send(error));
});

app.listen(port, () => {
  console.log(`Connected on port ${port}`);
});
