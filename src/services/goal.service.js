const httpStatus = require('http-status');
const { Goal, User } = require('../models');
const ApiError = require('../utils/ApiError');

const createGoal = async (goalData, user) => {
  if (goalData.total) {
    goalData.total = Number(goalData.total);
  }
  if (goalData.progress) {
    goalData.progress = Number(goalData.progress);
  }
  if (goalData.measured) {
    goalData.measured = Number(goalData.measured);
  }
  if (goalData.dou == '') {
    delete goalData.dou;
  }
  const data = {
    user: user.id,
    ...goalData,
  };
  return Goal.create(data);
};

const queryGoal = async (filter, options) => {
  const goal = await Goal.paginate(filter, options);
  return goal;
};

const getGoal = async (id) => {
  const goals = await Goal.findAll({ where: { user: id } });
  return goals;
};

const getGoalById = async (id) => {
  return Goal.findByPk(id);
};
const getGoalByIdAndUserId = async (id, userId) => {
  return Goal.findOne({
    where: {
      user: userId,
      id: id,
    },
  });
};

const updateGoalById = async (updateBody, userId) => {
  const goal = await getGoalByIdAndUserId(updateBody.id, userId);
  if (!goal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Goal not found');
  }
  if (updateBody.total < updateBody.progress) {
    updateBody.progress = updateBody.total;
  }

  Object.assign(goal, updateBody);
  await goal.save();
  return goal;
};

const deleteGoalById = async (goalId) => {
  const goal = await getGoalById(goalId);
  if (!goal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Goal not found');
  }
  await Goal.remove();
  return goal;
};

module.exports = {
  createGoal,
  queryGoal,
  getGoalById,
  updateGoalById,
  deleteGoalById,
  getGoal,
  getGoalByIdAndUserId,
};
