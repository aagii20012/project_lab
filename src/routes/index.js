const express = require('express');
const auth = require('./auth.routes');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const goalRoute = require('./goal.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/goal',
    route: goalRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
