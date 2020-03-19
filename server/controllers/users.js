const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user'); 

usersRouter.get('/', async (req, resp) => {
  const users = await User.find({});
  resp.json(users.map(user => user.toJSON()));
});

usersRouter.post('/', async (req, resp, next) => {
  const body = req.body;
  const SALT_ROUNDS = 10;
  const passwordHash = await bcrypt.hash(body.password, SALT_ROUNDS);

  const user = new User({
    username: body.username,
    passwordHash,
    name: body.name
  });

  try {
    const savedUser = await user.save();
    resp.json(savedUser.toJSON());
  } catch (exception) {
    next(exception);
  }
}); 

module.exports = usersRouter;


