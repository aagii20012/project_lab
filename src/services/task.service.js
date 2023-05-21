const httpStatus = require('http-status');
const config = require('../config/config');
const { GoalTask } = require('../models');
const tokenService = require('./token.service');
const jwt = require('jsonwebtoken');

const getAllTask = async (token) => {
  const goals = await GoalTask.findAll();
  return goals;
};

const getTaskById = async (id) => {
  const goal = await GoalTask.findByPk(id);
  if (!goal) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Goal not found');
  }
  return goal;
};

const getTaskByPackageId = async (id) => {
  const goal = await GoalTask.findAll({
    where: {
      goalPackageId: id,
    },
  });
  return goal;
};

const createTaskWithUserAndPackage = async (taskData, user, package) => {
  if (taskData.incProgress) {
    taskData.incProgress = Number(taskData.incProgress);
  }
  const data = {
    userId: user,
    goalPackageId: package.id,
    ...taskData,
  };
  console.log(data);
  return GoalTask.create(data);
};

const getTaskByIdAndUserId = async (id, userId) => {
  return GoalTask.findOne({
    where: {
      userId: userId,
      id: id,
    },
  });
};

const updateTaskById = async (updateBody, user) => {
  const goal = await getTaskByIdAndUserId(updateBody.id, userId);
  if (!goal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Goal not found');
  }
  Object.assign(goal, updateBody);
  await goal.save();
  return goal;
};

const deleteTaskById = async (goalId, userId) => {
  const goal = await getTaskById(goalId);
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
  getAllTask,
  getTaskById,
  createTaskWithUserAndPackage,
  updateTaskById,
  deleteTaskById,
  getTaskByPackageId,
};
