const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const { User, Token } = require('../models');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);

router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

router.post('/test', async (req, res) => {
  result = await Token.findOne({
    token: req.body.refreshToken,
    type: 'refresh',
    blacklisted: false,
  });
  res.send(result);
});

module.exports = router;
