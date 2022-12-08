const express = require('express');
const validate = require('../middlewares/validate');
const goalController = require('../controllers/goal.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/Goal', auth(), goalController.setGoal);
router.post('/Goals', auth(), goalController.getAllGoal);
router.put('/Goals', auth(), goalController.updateProgress);
router.get('/Goal/:id', auth(), goalController.getGoal);

module.exports = router;
