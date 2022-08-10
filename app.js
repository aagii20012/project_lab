const express = require('express')
const bodyParser = require('body-parser');
const routes = require('./routes')
const passport = require('passport');
const { jwtStrategy } = require('./config/passport')
const ApiError = require('./utils/ApiError.js')
const httpStatus = require('http-status');

const app = express()

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use(routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

module.exports = app;
