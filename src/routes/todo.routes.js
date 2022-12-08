const express = require('express');
const validate = require('../middlewares/validate');
const todoController = require('../controllers/todo.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/Todo', auth(), todoController.setTodo);
router.get('/Todos', auth(), todoController.getAllTodo);
router.put('/Todo', auth(), todoController.updateTodo);
router.get('/Todo/:id', auth(), todoController.getTodo);

module.exports = router;
