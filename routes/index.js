const express = require('express');
const auth = require('./auth.routes');
const authRoute = require('./auth.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
