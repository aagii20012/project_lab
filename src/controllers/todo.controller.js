const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { todo } = require('../models/index');
const getToken = require('../utils/getToken');
const { todoService, profleService, userService } = require('../services');
const moment = require('moment');

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
  res.status(httpStatus.OK).send({ todo });
});

const getTodays = catchAsync(async (req, res) => {
  const date = moment().format('YYYY-MM-DD');
  const date2 = moment().add(1, 'day').format('YYYY-MM-DD');
  const todo = await getAllTodoWithDate(req, date, date2);
  res.status(httpStatus.OK).send({ todo });
});

const getYesterday = catchAsync(async (req, res) => {
  const date = moment().subtract(1, 'day').format('YYYY-MM-DD');
  const date2 = moment().format('YYYY-MM-DD');
  const todo = await getAllTodoWithDate(req, date, date2);
  res.status(httpStatus.OK).send({ todo });
});

const getAllTodoWithDate = async (req, date, date2) => {
  const token = getToken(req);
  console.log(token);
  const userId = await profleService.getUserByToken(token);
  const todo = await todoService.getTodoByDate(userId, date, date2);
  return todo;
};

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

const getNumberTodo = catchAsync(async (req, res) => {
  const token = getToken(req);
  const userId = await profleService.getUserByToken(token);
  const date = moment().format('YYYY-MM-DD');
  const today = await todoService.getTodoCountByDate(userId, date, new Date());
  const date2 = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const yesterday = await todoService.getTodoCountByDate(userId, date2, date);
  res.status(httpStatus.CREATED).send({ today, yesterday });
});

const completeTodo = catchAsync(async (req, res) => {
  const token = getToken(req);
  const id = req.params.id;
  const userId = await profleService.getUserByToken(token);
  const todo = await todoService.getTodoByIdAndUserId(id, userId);
  todo.status = 'Complete';
  const result = await todoService.updateTodoById(todo, userId);
  res.status(httpStatus.CREATED).send({ result });
});

const removeTodo = catchAsync(async (req, res) => {
  const token = getToken(req);
  const id = req.params.id;
  const userId = await profleService.getUserByToken(token);
  const todo = await todoService.deleteTodoById(id, userId);
  res.status(httpStatus.CREATED).send({ todo });
});

module.exports = {
  setTodo,
  getAllTodo,
  getTodo,
  updateTodo,
  getNumberTodo,
  completeTodo,
  getTodays,
  getYesterday,
  removeTodo,
};
