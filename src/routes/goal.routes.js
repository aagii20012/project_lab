const express = require('express');
const validate = require('../middlewares/validate');
const goalController = require('../controllers/goal.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/Goal', auth(), goalController.setGoal);
router.get('/Goal', auth(), goalController.getAllGoal);
router.put('/Goal', auth(), goalController.updateProgress);
router.get('/Goal/:id', auth(), goalController.getGoal);
router.post('/Goal/Names', auth(), goalController.getGoalOnlyNames);
router.get('/Goal/:id/Progress', auth(), goalController.getGoalProgress);

module.exports = router;
