const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeZoneSchema = Schema({
  _id: String,
  value: String,
  abbr: String,
  offset: Number,
  isdst: Boolean,
  text: String,
  utc: [String],
});

const TimeZoneModel = mongoose.model('TimeZone', TimeZoneSchema);

module.exports = {
  TimeZoneModel,
}