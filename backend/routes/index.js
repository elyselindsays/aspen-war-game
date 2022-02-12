const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const db = require('../db/models');

router.use('/api', apiRouter);


if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
}


router.get('/', async (req, res, next) => {
  try {
    const players = await db.Player.findAll();
    return res.json({players})
  } catch (err) {
    next(err)
  }
})

router.get('/wins', async (req, res, next) => {
  try {
    const wins = await db.Winner.findAll();
    return res.json({wins})
  } catch(err) {
    next(err)
  }
})

router.post('/wins', async (req, res, next) => {
  try {
    const {playerId} = req.body;
    const win = await db.Winner.create({playerId});
    res.status(201).json({win})
  } catch(err) {
    next(err)
  }
})


module.exports = router;