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

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  router.get('/', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
  router.use(express.static(path.resolve("../frontend/build")));
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
}


app.use(routes);

module.exports = app;