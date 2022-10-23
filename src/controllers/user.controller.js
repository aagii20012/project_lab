const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { User } = require('../models/index');
const { profleService } = require('../services');

const getUser = catchAsync(async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  const userId = await profleService.getUserByToken(token);
  const user = await User.findByPk(userId);
  res.status(httpStatus.CREATED).send({ user });
});

const setUser = catchAsync(async (req, res) => {});

module.exports = {
  getUser,
  setUser,
};
