require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const freezebeRoutes = require('./routes/freezebe.route');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//routing
app.use('/freezebe', freezebeRoutes);

module.exports = app;