const axios = require('axios');
require('dotenv/config');

const linguaRobot = axios.create({
  baseURL: process.env.LINGUA_ROBOT_BASE_URL || 'https://lingua-robot.p.rapidapi.com/',
  headers: {
    'x-rapidapi-key': process.env.LINGUA_ROBOT_KEY,
    'x-rapidapi-host': process.env.LINGUA_ROBOT_HOST,
  }
});

module.exports = linguaRobot;
