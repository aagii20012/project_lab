const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { todo } = require('../models/index');
const getToken = require('../utils/getToken');
const { todoService, profleService, userService } = require('../services');

const setTodo = catchAsync(async (req, res) => {
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Nonono');
  }
  const todo = await todoService.createTodo(req.body, user);
  res.status(httpStatus.CREATED).send({ todo });
});

const getAllTodo = catchAsync(async (req, res) => {
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const todo = await todoService.getTodo(userId);
  res.status(httpStatus.CREATED).send({ todo });
});

const getTodo = catchAsync(async (req, res) => {
  const token = getToken(req);
  const id = req.params.id;
  const userId = await profleService.getUserByToken(token);
  const todo = await todoService.getTodoByIdAndUserId(id, userId);
  res.status(httpStatus.CREATED).send({ todo });
});

const updateTodo = catchAsync(async (req, res) => {
  const data = req.body;
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const todo = await todoService.updateTodoById(data, userId);
  res.status(httpStatus.CREATED).send({ todo });
});

module.exports = {
  setTodo,
  getAllTodo,
  getTodo,
  updateTodo,
};
