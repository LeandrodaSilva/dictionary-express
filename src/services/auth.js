const axios = require('axios');

const auth = axios.create({
  baseURL: "https://reqres.in/"
});

module.exports = auth;
