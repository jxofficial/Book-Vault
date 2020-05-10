const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, resp) => {
  const body = req.body;
  const user = await User.findOne({ username: body.username });
  const passwordIsCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash);

  if (!passwordIsCorrect) {
    return resp.status(401).json({ error: 'Invalid username or password' });
  }

  // token signing only occurs when password is correct
  const userForTokenSigning = {
    username: user.username,
    id: user._id
  }
  const token = await jwt.sign(userForTokenSigning, process.env.TOKEN_PRIVATE_KEY);

  resp
    .status(200)
    .json({
      token,
      username: user.username,
      name: user.name
    });
});

module.exports = loginRouter;