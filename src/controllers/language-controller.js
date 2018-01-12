const { LanguageModel } = require('../models/language');
const LanguageController = {
  get: async (req, res) => {
    const data = await LanguageModel.find();
    res.json(data);
  },
};

module.exports = LanguageController;