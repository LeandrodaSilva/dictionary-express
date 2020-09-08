const express = require('express');
const SearchController = require('./controllers/SearchController');
const routes = express.Router();

routes.get('/search', SearchController.create);

module.exports = routes;
