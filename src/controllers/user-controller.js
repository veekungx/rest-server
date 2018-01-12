const { UserModel } = require('../models/user');
const generateAccessToken = require('../helpers/generate-token');
const bcrypt = require('bcrypt');

const UserController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!email) return res.status(400).send({ error: 'email is required' });
    if (!password) return res.status(400).send({ error: 'password is required' });

    if (!user) return res.status(401).send();
    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (isAuthenticated) {
      const accessToken = generateAccessToken(user._id);
      user.tokens.push(accessToken);
      await user.save();

      const result = {
        _id: user._id,
        email: user.email,
        preference: user.preference,
        token: accessToken.token
      }

      return res.send(result);
    } else {
      return res.status(401).send();
    }
  },
  getUser: async (req, res) => {
    res.json(req.user);
  },
  createUser: async (req, res) => {
    const { email, password } = req.body;
    const user = new UserModel({ email, password });
    let accessToken;

    try {
      await user.save();
      accessToken = generateAccessToken(user._id);
      user.tokens.push(accessToken);
      await user.save();
    } catch (e) {
      return res.status(400).send({ error: e.message });
    }

    const { _id, email: userEmail, preference } = user;

    const result = {
      _id,
      email: userEmail,
      preference,
      token: accessToken.token,
    }

    return res
      .status(201)
      .send(result);
  },
  removeToken: async (req, res) => {
    const { Authorization } = req.headers;
    const { user, token } = req;

    await user.update({ $pull: { tokens: { token } } });
    res.send('OK');
  },
  patchPreference: async (req, res) => {
    const { user } = req;
    user.preference = req.body;
    await user.save();
    res.send('OK');
  }
};

module.exports = UserController;