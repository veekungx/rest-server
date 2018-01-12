const { TimeZoneModel } = require('../models/timezone');

const TimeZoneController = {
  get: async (req, res) => {
    const data = await TimeZoneModel.find();
    res.json(data);
  },
};

module.exports = TimeZoneController;