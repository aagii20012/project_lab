const httpStatus = require('http-status');
const config = require('../config/config');
const { Comment, Favorite } = require('../models');
const tokenService = require('./token.service');
const jwt = require('jsonwebtoken');

const handleComment = async (data, pg, userId) => {
  const goals = await Comment.findAll({
    where: {
      userId: userId,
      goalPackageId: pg.id,
    },
  });
  return goals;
};
const handleFavorite = async () => {
  const goals = await GoalPackage.findAll();
  return goals;
};

module.exports = {
  getAllGoalPackage,
  getGoalPackageById,
  createGoalPackage,
  updateGoalPackageById,
  deleteGoalPackageById,
};
