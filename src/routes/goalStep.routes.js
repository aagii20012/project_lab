const express = require('express');
const validate = require('../middlewares/validate');
const goalStepController = require('../controllers/goalStep.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/Goal/:id/Step').post(auth(), goalStepController.setStep).get(auth(), goalStepController.getAllStep);

router
  .route('/Goal/:id/Step/:id2')
  .put(auth(), goalStepController.updateStep)
  .get(auth(), goalStepController.getStep)
  .delete(auth(), goalStepController.deleteStep);

router.post('/Goal/:id/Step/:id2/Complete', auth(), goalStepController.completeStep);

module.exports = router;
