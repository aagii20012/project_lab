const httpStatus = require('http-status');
const { Op, Sequelize } = require('sequelize');
const { Goal, History } = require('../models');
const ApiError = require('../utils/ApiError');
const historyService = require('./history.service');
const moment = require('moment');

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
  const goal = await Goal.findByPk(id);
  if (!goal) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Goal not found');
  }
  return goal;
};
const getGoalByIdAndUserId = async (id, userId) => {
  return Goal.findOne({
    where: {
      user: userId,
      id: id,
    },
  });
};

const getGoalNamesByUserId = async (userId) => {
  return Goal.findAll({
    where: {
      user: userId,
      status: 'new',
    },
    attributes: ['title', 'description', 'status', 'id'],
  });
};

const getGoalProgressByIdAndUserId = async (id, userId, from, to) => {
  const history = await History.findAll({
    where: {
      createdAt: {
        [Op.gte]: from,
        [Op.lt]: to,
      },
      user: userId,
      goal: id,
    },
    raw: true,
    group: 'goal',
    attributes: ['goal', [Sequelize.fn('sum', Sequelize.col('progress')), 'progress']],
  });

  return history;
};

const updateGoalById = async (updateBody, userId) => {
  const goal = await getGoalByIdAndUserId(updateBody.id, userId);
  console.log(goal);
  if (!goal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Goal not found');
  }
  if (updateBody.total < updateBody.progress) {
    updateBody.progress = updateBody.total;
    updateBody.status = 'Complete';
  }
  if (goal.progress != updateBody.progress) {
    const diff = updateBody.progress - goal.progress;
    await historyService.createHistory(diff, goal.user, goal.id);
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
  getGoalNamesByUserId,
  getGoalProgressByIdAndUserId,
};
