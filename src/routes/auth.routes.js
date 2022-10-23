const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const catchAsync = require('../utils/catchAsync');
const faker = require('faker');
const { User, Token } = require('../models');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);

router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

router.get(
  '/test',
  catchAsync(async (req, res) => {
    newUser = {
      firstname: '123',
      lastname: '123',
      email: 'email@email.com',
      password: 'password1',
    };
    const jane = await User.create(newUser);
    res.send(jane);
  })
);

module.exports = router;
