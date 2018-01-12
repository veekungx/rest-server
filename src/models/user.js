const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = require('../secret');

const Schema = mongoose.Schema;
const UserSchema = Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true
    }
  }],
  preference: {
    localization: {
      language: {
        type: String,
        default: '41' //English
      },
      timezone: {
        type: String,
        default: '77', //Bangkok
      },
      currency: {
        type: String,
        default: '1', //USD
      },
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['EVERYONE', 'PRIVATE'],
        default: 'EVERYONE'
      },
      messages: {
        type: String,
        enum: ['EVERYONE', 'FOLLOWED_PEOPLE', 'NONE'],
        default: 'FOLLOWED_PEOPLE',
      },
    },
    content: {
      categoryList: {
        type: String,
        enum: ['ENABLE', 'DISABLE'],
        default: 'ENABLE',
      }
    }
  }
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (e) {
      throw new Error(e);
    }
  } else {
    next();
  }
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const { _id, email, preference } = user.toObject();
  return { _id, email, preference }
}

UserSchema.statics.findByToken = async function (token) {
  const UserModel = this;
  let decode;
  try {
    decode = jwt.decode(token, secret);
  } catch (e) {
    throw new Error(e);
  }

  if (!decode) return null;

  const { userId } = decode;

  const user = await UserModel.findOne({
    _id: userId,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
  return user;
}

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
  UserModel,
}