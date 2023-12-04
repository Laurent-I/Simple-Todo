const express = require('express');
const TodoController = require('../controllers/TodoController');
const AuthMiddleware = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', AuthMiddleware.verifyToken, TodoController.getAllTodos);

router.get('/:id', AuthMiddleware.verifyToken, TodoController.getTodo);

router.post('/', AuthMiddleware.verifyToken, TodoController.postAddTodo);

router.put('/:id', AuthMiddleware.verifyToken, TodoController.putUpdateTodo);

router.delete('/:id', AuthMiddleware.verifyToken, TodoController.deleteTodo);

module.exports = router;