const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Goal } = require('../models/index');
const getToken = require('../utils/getToken');
const { goalService, profleService, goalStepService } = require('../services');
const ApiError = require('../utils/ApiError');

const checkAndGetStep = async (req) => {
  const token = getToken(req);
  const id = req.params.id;
  const userId = await profleService.getUserByToken(token);
  const goal = await goalService.getGoalById(id);
  if (goal.user != userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Nonono');
  }
  return goal;
};

const setStep = catchAsync(async (req, res) => {
  const goal = await checkAndGetStep(req);
  const step = await goalStepService.createStep(req.body, goal);
  res.status(httpStatus.CREATED).send({ step });
});

const getAllStep = catchAsync(async (req, res) => {
  const goal = await checkAndGetStep(req);
  const step = await goalStepService.getStep(goal.id);
  res.status(httpStatus.OK).send({ step });
});

const getStep = catchAsync(async (req, res) => {
  const id = req.params.id2;
  const goal = await checkAndGetStep(req);
  const step = await goalStepService.getStepByIdAndGoalId(id, goal.id);
  res.status(httpStatus.OK).send({ step });
});

const updateStep = catchAsync(async (req, res) => {
  const id = req.params.id2;
  const goal = await checkAndGetStep(req);
  const step = await goalStepService.updateStepById(req.body, goal.id, id);
  res.status(httpStatus.OK).send({ step });
});

const deleteStep = catchAsync(async (req, res) => {
  const id = req.params.id2;
  const goal = await checkAndGetStep(req);
  const step = await goalStepService.deleteStepById(goal.id, id);
  res.status(httpStatus.OK).send({ step });
});

const completeStep = catchAsync(async (req, res) => {
  const id = req.params.id2;
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const goal = await checkAndGetStep(req);
  const step = await goalStepService.completeStep(goal.id, id, userId);
  res.status(httpStatus.OK).send({ step });
});

module.exports = {
  setStep,
  getAllStep,
  updateStep,
  getStep,
  deleteStep,
  completeStep,
};
