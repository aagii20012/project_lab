const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService} = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await authService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  res.send({ user });
});

module.exports = {
    register,
    login
  };