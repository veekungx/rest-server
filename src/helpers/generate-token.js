const jwt = require('jsonwebtoken');
const secret = require('../secret');
const generateToken = (userId = "") => {
  if (!userId) throw new Error('no user id');
  const access = 'auth';
  const token = jwt.sign({ userId, access }, secret)
  return { access, token };
};

module.exports = generateToken;