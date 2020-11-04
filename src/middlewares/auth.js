const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ error: "Token not provided." });
  }

  const parts = authorization.split(' ');
  const [ scheme, token ] = parts;

  if (parts.length !== 2) {
    return res.status(401).send({ error: "Token error." });
  }

  if (scheme !== 'Bearer') {
    return res.status(401).send({ error: "Token malformed." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return res.status(401).send({ error: "Token invalid." });

    req.userId = decoded.id;
    console.log(decoded.id);
    if (next) next();
  });
}
