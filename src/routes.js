const express = require('express');
const SearchController = require('./controllers/SearchController');
const routes = express.Router();

routes.get('/', (req, res) => {
  return res.send("Hello from <a href='https://github.com/LeandrodaSilva/dictionary-express'>Dictionary API</a>")
});
routes.get('/search', SearchController.create);

module.exports = routes;
