const httpStatus = require('http-status');
const config = require('../config/config');
const { User, Token } = require('../models');
const { tokenTypes } = require('../config/tokens');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUserByToken = async (token) => {
  const decoded = jwt.verify(token, config.jwt.secret);
  var userId = decoded.sub;
  return userId;
};

module.exports = {
  getUserByToken,
};
