const LinguaRobot = require('../services/lingua-robot');

module.exports = {
  async  create(request, response) {
    const { word } = request.query;

    console.log(word);

    const resp = await LinguaRobot.get(`language/v1/entries/en/${word}`);

    return response.json(resp.data);
  }
}
