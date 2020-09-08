const LinguaRobot = require('../services/lingua-robot');

module.exports = {
  async  create(request, response) {
    const { world } = request.query;

    console.log(world);

    const resp = await LinguaRobot.get(`language/v1/entries/en/${world}`);

    return response.json(resp.data);
  }
}
