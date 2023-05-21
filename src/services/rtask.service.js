const httpStatus = require('http-status');
const { GoalRepeatableTask } = require('../models');
const tokenService = require('./token.service');

const getAllTask = async (token) => {
  const goals = await GoalRepeatableTask.findAll();
  return goals;
};

const getTaskById = async (id) => {
  const goal = await GoalRepeatableTask.findByPk(id);
  if (!goal) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Goal not found');
  }
  return goal;
};

const getTaskByPackageId = async (id) => {
  const goal = await GoalRepeatableTask.findAll({
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
  return GoalRepeatableTask.create(data);
};

const getTaskByIdAndUserId = async (id, userId) => {
  return GoalRepeatableTask.findOne({
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
