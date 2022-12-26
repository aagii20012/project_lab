const express = require('express');
const validate = require('../middlewares/validate');
const todoController = require('../controllers/todo.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/Todo', auth(), todoController.setTodo);
router.get('/Todo', auth(), todoController.getAllTodo);
router.put('/Todo', auth(), todoController.updateTodo);
router.get('/Todo/:id', auth(), todoController.getTodo);
router.delete('/Todo/:id', auth(), todoController.removeTodo);

router.post('/Todo/Number', auth(), todoController.getNumberTodo);
router.post('/Todo/:id/Complete', auth(), todoController.completeTodo);
router.post('/Todo/Today', auth(), todoController.getTodays);
router.post('/Todo/Yesterday', auth(), todoController.getYesterday);

module.exports = router;
