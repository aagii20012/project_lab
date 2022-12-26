const httpStatus = require('http-status');
const { Op } = require('sequelize');
const { History } = require('../models');
const ApiError = require('../utils/ApiError');

const createHistory = async (progress, user, goal, todo, step) => {
  const data = {
    progress: progress,
    user: user,
    goal: goal,
    todo: todo,
    step: step,
  };
  return History.create(data);
};

const getAllHistoryWithFilter = async (filter, start, limit) => {
  const queryFilter = [];
  filter.forEach((item) => {
    const opAndValue = {
      [Op.eq]: item[2],
    };
    const temp = {
      [item[0]]: opAndValue,
    };
    queryFilter.push(temp);
  });
  const data = await History.findAll({
    where: queryFilter,
    offset: start,
    limit: limit,
  });
  return data;
};

module.exports = {
  createHistory,
  getAllHistoryWithFilter,
};
