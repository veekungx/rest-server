const { CurrencyModel } = require('../models/currency');
const CurrencyController = {
  get: async (req, res) => {
    const data = await CurrencyModel.find();
    res.json(data);
  },
};

module.exports = CurrencyController;