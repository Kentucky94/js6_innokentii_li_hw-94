const User = require('../models/User');

const auth = async (req, res, next) => {
  const authorization = req.get('Authorization');
  if(!authorization) return res.status(400).send({error: 'No authorization header'});

  const [type, token] = authorization.split(' ');
  if(type !== 'Token' || !token) return res.status(400).send({error: 'Invalid type or no token'});

  const user = await User.findOne({token});
  if(!user) return res.status(400).send({error: 'Invalid token or no user'});

  req.user = user;

  next();
};

module.exports = auth;