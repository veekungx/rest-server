const { UserModel } = require('../models/user');
const authenticate = async (req, res, next) => {

  const authorization = req.header('Authorization');
  if (!authorization) return res.status(401).send();

  const token = authorization.split(' ')[1];
  if (!token) return res.status(401).send();

  const user = await UserModel.findByToken(token);
  if (!user) return res.status(401).send();
  req.user = user;
  req.token = token;
  next();
}

module.exports = authenticate;