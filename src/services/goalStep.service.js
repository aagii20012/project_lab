const httpStatus = require('http-status');
const { Step } = require('../models');
const ApiError = require('../utils/ApiError');
const historyService = require('./history.service');
const goalService = require('./goal.service');

const createStep = async (stepData, goal) => {
  if (stepData.dou == '') {
    delete stepData.dou;
  }
  const data = {
    goal: goal.id,
    ...stepData,
  };
  return Step.create(data);
};

const queryStep = async (filter, options) => {
  const step = await Step.paginate(filter, options);
  return step;
};

const getStep = async (id) => {
  const step = await Step.findAll({ where: { goal: id } });
  return step;
};

const getStepById = async (id) => {
  const step = await Step.findByPk(id);
  if (!step) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Step not found');
  }
  return step;
};

const getStepByIdAndGoalId = async (id, goalId) => {
  const step = await Step.findOne({
    where: {
      goal: goalId,
      id: id,
    },
  });
  if (!step) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Step not found');
  }
  return step;
};

const updateStepById = async (updateBody, goalId, stepId) => {
  const step = await getStepByIdAndGoalId(stepId, goalId);
  Object.assign(step, updateBody);
  await step.save();
  return step;
};

const completeStep = async (goalId, stepId, userId) => {
  const step = await getStepByIdAndGoalId(stepId, goalId);
  if (step.progress > 0) {
    const goal = await goalService.getGoalByIdAndUserId(goalId, userId);
    const data = {
      id: goalId,
      progress: goal.progress + step.progress,
    };
    await goalService.updateGoalById(data, userId);
  }
  if (!step.isRepeatable) {
    step.status = 'complete';
  }
  await step.save();
  return step;
};

const deleteStepById = async (goalId, stepId) => {
  const step = await getStepByIdAndGoalId(stepId, goalId);
  await step.destroy();
  return step;
};

module.exports = {
  createStep,
  queryStep,
  getStepById,
  updateStepById,
  deleteStepById,
  getStep,
  getStepByIdAndGoalId,
  completeStep,
};
