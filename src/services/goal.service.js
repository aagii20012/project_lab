const httpStatus = require('http-status');
const config = require('../config/config');
const { User, Category, GoalPackage, GoalTask, GoalRepeatableTask } = require('../models');
const tokenService = require('./token.service');
const jwt = require('jsonwebtoken');

const getAllGoalPackage = async (body, userId) => {
  let where;
  if (body.categoryId) {
    where = { category: body.categoryId };
  }
  const goals = await GoalPackage.findAll({
    where: where,
    include: [
      {
        model: User,
        attributes: ['firstname', 'lastname', 'email'],
        required: true,
      },
    ],
  });
  return goals;
};

const getGoalPackageById = async (id) => {
  const goal = await GoalPackage.findByPk(id);
  if (!goal) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Goal not found');
  }
  return goal;
};

const createGoalPackage = async (goalData, user) => {
  if (goalData.progressLimit) {
    goalData.progressLimit = Number(goalData.progressLimit);
  }
  const data = {
    userId: user,
    UserId: user,
    ...goalData,
  };
  return GoalPackage.create(data);
};

const getGoalByIdAndUserId = async (id, userId) => {
  return GoalPackage.findOne({
    where: {
      userId: userId,
      id: id,
    },
  });
};

const updateGoalPackageById = async (updateBody, user) => {
  const goal = await getGoalByIdAndUserId(updateBody.id, userId);
  if (!goal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Goal not found');
  }
  Object.assign(goal, updateBody);
  await goal.save();
  return goal;
};

const deleteGoalPackageById = async (goalId, userId) => {
  const goal = await getGoalPackageById(goalId);
  if (!goal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Goal not found');
  }
  if (goal.user != userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Goal not found');
  }
  await goal.destroy();
  return goal;
};

module.exports = {
  getAllGoalPackage,
  getGoalPackageById,
  createGoalPackage,
  updateGoalPackageById,
  deleteGoalPackageById,
};
