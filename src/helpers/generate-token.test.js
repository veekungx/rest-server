const jwt = require('jsonwebtoken');
const { expect } = require('chai');
const secret = require('../secret');
const generateToken = require('./generate-token');

describe('generateToken', () => {
  it('should generate token', () => {
    const userId = '1234';
    const { token } = generateToken(userId);
    const decoded = jwt.decode(token, secret);
    expect(decoded.userId).to.equal(userId);
    expect(decoded.access).to.equal('auth');
  });

  it('should throw error when no userId given', () => {
    expect(() => generateToken()).to.throw('no user id');
  });
});