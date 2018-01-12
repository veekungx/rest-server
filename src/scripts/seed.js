const mongoose = require('mongoose');
const { CurrencyModel } = require('../models/currency');
const { LanguageModel } = require('../models/language');
const { TimeZoneModel } = require('../models/timezone');
const currencyData = require('../data/currency.json');
const languageData = require('../data/language.json');
const timezoneData = require('../data/timezone.json');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dev', { useMongoClient: true });
mongoose.connection.once('open', async () => {
  await seed();
  console.log('Seed completed');
  mongoose.connection.close();
});
const seed = async () => {
  await CurrencyModel.remove({});
  await LanguageModel.remove({});
  await TimeZoneModel.remove({});

  await CurrencyModel.insertMany(currencyData);
  await LanguageModel.insertMany(languageData);
  await TimeZoneModel.insertMany(timezoneData);
}

