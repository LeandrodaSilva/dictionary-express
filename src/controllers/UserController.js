const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/', async (req, res) => {
  const users = await connection('users')
  .select('*')
  .orderBy('id');

  return res.json(users);
})

module.exports = app => app.use('/user', router)
