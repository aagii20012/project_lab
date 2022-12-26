const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Goal } = require('../models/index');
const getToken = require('../utils/getToken');
const { goalService, profleService, userService, historyService } = require('../services');
const moment = require('moment');

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

const getGoalOnlyNames = catchAsync(async (req, res) => {
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const goal = await goalService.getGoalNamesByUserId(userId);
  res.status(httpStatus.OK).send({ goal });
});

const getGoalProgress = catchAsync(async (req, res) => {
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const todayDate = moment().format('YYYY-MM-DD');
  const id = req.params.id;
  const today = await goalService.getGoalProgressByIdAndUserId(id, userId, todayDate, new Date());
  const yestedayDate = moment().subtract(1, 'day').format('YYYY-MM-DD');
  const yesteday = await goalService.getGoalProgressByIdAndUserId(id, userId, yestedayDate, todayDate);
  res.status(httpStatus.OK).send({ today, yesteday });
});

const updateProgress = catchAsync(async (req, res) => {
  const data = req.body;
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const goal = await goalService.updateGoalById(data, userId);
  res.status(httpStatus.OK).send({ goal });
});

module.exports = {
  setGoal,
  getAllGoal,
  updateProgress,
  getGoal,
  getGoalOnlyNames,
  getGoalProgress,
};
