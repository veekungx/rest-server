const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguageSchema = Schema({
  _id: String,
  code: String,
  name: String
}, { _id: false });

const LanguageModel = mongoose.model('Language', LanguageSchema);

module.exports = {
  LanguageModel,
}