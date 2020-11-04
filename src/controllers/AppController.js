const express = require('express');
const router = express.Router();

router.get('', async (req, res) => {
  return res.send("Hello from <a href='https://github.com/LeandrodaSilva/dictionary-express'>Dictionary API</a>.")
})

module.exports = app => app.use('/', router)
