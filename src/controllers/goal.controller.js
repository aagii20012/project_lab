const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Goal } = require('../models/index');
const getToken = require('../utils/getToken');
const { goalService, profleService, userService } = require('../services');

const setGoal = catchAsync(async (req, res) => {
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Nonono');
  }
  const goal = await goalService.createGoal(req.body, user);
  res.status(httpStatus.CREATED).send({ goal });
});

const getAllGoal = catchAsync(async (req, res) => {
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const goal = await goalService.getGoal(userId);
  res.status(httpStatus.CREATED).send({ goal });
});

const getGoal = catchAsync(async (req, res) => {
  const token = getToken(req);
  const id = req.params.id;
  const userId = await profleService.getUserByToken(token);
  const goal = await goalService.getGoalByIdAndUserId(id, userId);
  res.status(httpStatus.CREATED).send({ goal });
});

const updateProgress = catchAsync(async (req, res) => {
  const data = req.body;
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const goal = await goalService.updateGoalById(data, userId);
  res.status(httpStatus.CREATED).send({ goal });
});

module.exports = {
  setGoal,
  getAllGoal,
  updateProgress,
  getGoal,
};
