const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrencySchema = Schema({
  _id: String,
  symbol: String,
  name: String,
  symbol_native: String,
  decimal_digits: Number,
  rounding: Number,
  code: String,
  name_plural: String
}, { _id: false });

const CurrencyModel = mongoose.model('Currency', CurrencySchema);

module.exports = {
  CurrencyModel,
}