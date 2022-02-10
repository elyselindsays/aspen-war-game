const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const db = require('../db/models');

router.use('/api', apiRouter);

router.get('/hello/world', function (req, res) {

  res.send('Hello World!');
});

router.get('/', async (req, res, next) => {

})

module.exports = router;