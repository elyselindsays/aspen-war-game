const express = require('express');
const router = express.Router();
const apiRouter = require('./api');
const db = require('../db/models');

router.use('/api', apiRouter);


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