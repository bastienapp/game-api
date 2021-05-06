const { response } = require('express');
const express = require('express');
require('dotenv').config();
const app = express();
const connection = require('./config/mysql');
app.use(express.json());

const port = process.env.PORT;

app.get('/games', (request, response) => {
  connection
    .promise()
    .query('SELECT * FROM game')
    .then(([results]) => response.status(200).json(results))
    .catch((error) => response.status(500).send(error));
});

app.get('/games/:id', (request, response) => {
  const { id } = request.params;
  connection
    .promise()
    .query('SELECT * FROM game WHERE id = ?', [id])
    .then(([results]) => {
      if (results.length === 0) {
        response.sendStatus(404);
      } else {
        response.status(200).json(results);
      }
    })
    .catch((error) => response.status(500).send(error));
});

app.post('/games', (request, response) => {
  const { body } = request;

  connection
    .promise()
    .query(`INSERT INTO game (name, rate, publisher_id) VALUES (?, ?, ?)`, [
      body.name,
      body.rate,
      body.publisher_id,
    ])
    .then(([results]) => {
      response.status(201).json(results);
    })
    .catch((error) => {
      response.status(500).json(error);
    });
});

app.listen(port, () => {
  console.log(`Connected on port ${port}`);
});
