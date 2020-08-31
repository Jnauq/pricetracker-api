const express = require('express');
const cors = require('cors');
const routes = require('./routes/router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
 
app.get('/', function (req, res) {
  res.send('Welcome to Amazon PriceTracker API')
});


module.exports = app;