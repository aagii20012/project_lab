const express = require('express');
const auth = require('./auth.routes');
const goalRoute = require('./goal.routes');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const todoRoute = require('./todo.routes');
const goalStepRoute = require('./goalStep.routes');
const testRoute = require('./test.routes');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: authRoute,
  },
  {
    path: '/',
    route: goalRoute,
  },
  {
    path: '/',
    route: todoRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/',
    route: goalStepRoute,
  },
  {
    path: '/',
    route: testRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
