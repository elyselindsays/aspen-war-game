const express = require('express');
const router = express.Router();
const db = require('../db/models');

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  router.get('/', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'build', 'index.html')
    );
  });
  router.use(express.static(path.resolve("../frontend/build")));
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

router.get('/wins/1', async (req, res, next) => {
  try {
    const wins = await db.Winner.findAll({where: {playerId: 1}});
    return res.json({wins})
  } catch(err) {
    next(err)
  }
})
router.get('/wins/2', async (req, res, next) => {
  try {
    const wins = await db.Winner.findAll({where: {playerId: 2}});
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