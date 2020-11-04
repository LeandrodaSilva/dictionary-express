const express = require('express');
const router = express.Router();
const LinguaRobot = require('../services/lingua-robot');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('', async (req, res) => {
  const { word } = req.query;

  console.log(word);

  const api = await LinguaRobot.get(`language/v1/entries/en/${word}`);

  return res.json(api.data);
})

module.exports = app => app.use('/search', router)
