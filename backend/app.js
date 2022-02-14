const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = express.Router();
const routes = require('./routes');


const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

if (!isProduction) {
  app.use(cors());
};




app.use(routes);

module.exports = app;