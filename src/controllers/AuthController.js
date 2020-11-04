const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { celebrate, Segments, Joi, errors } = require('celebrate');

function createToken(params) {
  return jwt.sign(
    params,
    process.env.JWT_SECRET,
    {
      expiresIn: 86400,
    }
  );
}

router.post('/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().message("Invalid email."),
      password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{4,8}$')).message("Invalid password.")
    })
  }),
  async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = {...req.body, ...{password: hash} }

    console.log(user);

    await connection('users').insert(user);

    const registeredUser = await connection('users')
    .where('email', user.email)
    .select('*')
    .first();

    user.password = undefined;

    return res.json({ user, token: createToken({ id: registeredUser.id }) });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Registration failed.' });
  }
})

router.post('/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().message("Invalid email."),
      password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{4,8}$')).message("Invalid password.")
    })
  }),
  async (req, res) => {
  const { email, password } = req.body;
  const user = await connection('users')
  .where('email', email)
  .select('*')
  .first();

  if (!user) {
    return res.status(400).json({ error: 'No user found.' });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ error: 'Wrong password.' });
  }

  user.password = undefined;

  const token = createToken({ id: user.id });

  return res.cookie('token', 'Bearer ' + token).json({ user, token: token });
})

module.exports = app => {
  app.use('/auth', router)
  app.use(errors())
}
