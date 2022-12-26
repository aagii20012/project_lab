const express = require('express');
const validate = require('../middlewares/validate');
const test = require('../controllers/test');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/test', test.test);

module.exports = router;
