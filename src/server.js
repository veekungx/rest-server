const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('./middlewares/authenticate');
const UserController = require('./controllers/user-controller');
const CurrencyController = require('./controllers/currency-controller');
const LanguageController = require('./controllers/language-controller');
const TimeZoneController = require('./controllers/timezone-controller');
const app = express();
const env = process.env.NODE_ENV || 'developement';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://thedb/test', { useMongoClient: true });

app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static('public'));

app.get('/status', (req, res) => res.send('OK'));
app.get('/currencies', CurrencyController.get);
app.get('/timezones', TimeZoneController.get);
app.get('/languages', LanguageController.get);
app.get('/users/me', authenticate, UserController.getUser);
app.post('/users', UserController.createUser);
app.post('/users/login', UserController.login);
app.patch('/users/me/preference', authenticate, UserController.patchPreference);
app.delete('/users/me/token', authenticate, UserController.removeToken)

module.exports = app;
