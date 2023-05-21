const express = require('express');
const goalController = require('../controllers/goal.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth(), goalController.getPackges);
router.post('/save', auth(), goalController.savePackage);
router.post('/:id', auth(), goalController.getPackgesDetail);

module.exports = router;
