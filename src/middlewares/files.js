const auth = require('../middlewares/auth');
const connection = require('../database/connection');

module.exports = async (req, res, next) => {
  const parts = req.url.split('/');
  if (parts.length === 3 && parts[1] === "uploads" && parts[2].length) {
    auth(req, res, undefined);

    try {
      const file = await connection('files')
      .where('user_id', req.userId)
      .where('url', req.url)
      .select('*')
      .first();

      if (!file) return res.status(401).json({ error: 'Access not granted.' });

    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  next();
}
