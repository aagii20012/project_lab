const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { User } = require('../models/index');
const { profleService } = require('../services');
const getToken = require('../utils/getToken');

const getUser = catchAsync(async (req, res) => {
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const user = await User.findByPk(userId);
  res.status(httpStatus.CREATED).send({ user });
});

const setUser = catchAsync(async (req, res) => {});

module.exports = {
  getUser,
  setUser,
};
