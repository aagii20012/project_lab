const Joi = require('joi');
const { password } = require('./custom.validation');

const profile = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
  }),
};

module.exports = {
  profile,
};
