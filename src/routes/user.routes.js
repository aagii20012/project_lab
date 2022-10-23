const express = require('express');
const validate = require('../middlewares/validate');
const UserValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/profile')
  .get(auth(), userController.getUser)
  .post(auth(), validate(UserValidation.profile), userController.setUser);

module.exports = router;
