const httpStatus = require('http-status');
const { Todo, User } = require('../models');
const ApiError = require('../utils/ApiError');

const createTodo = async (todoData, user) => {
  if (todoData.dou == '') {
    delete todoData.dou;
  }
  if (todoData.forFuture == false) {
    delete todoData.dou;
  }
  const data = {
    user: user.id,
    ...todoData,
  };
  return Todo.create(data);
};

const queryTodo = async (filter, options) => {
  const todo = await Todo.paginate(filter, options);
  return todo;
};

const getTodo = async (id) => {
  const todos = await Todo.findAll({ where: { user: id } });
  return todos;
};

const getTodoById = async (id) => {
  return Todo.findByPk(id);
};

const getTodoByIdAndUserId = async (id, userId) => {
  console.log({ id: id, userId: userId });
  return Todo.findOne({
    where: {
      user: userId,
      id: id,
    },
  });
};

const updateTodoById = async (updateBody, userId) => {
  const todo = await getTodoByIdAndUserId(updateBody.id, userId);
  if (!todo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'todo not found');
  }

  Object.assign(todo, updateBody);
  await todo.save();
  return todo;
};

const deleteTodoById = async (todoId) => {
  const todo = await getTodoById(todoId);
  if (!todo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'todo not found');
  }
  await Todo.remove();
  return todo;
};

module.exports = {
  createTodo,
  queryTodo,
  getTodo,
  updateTodoById,
  deleteTodoById,
  getTodoById,
  getTodoByIdAndUserId,
};
