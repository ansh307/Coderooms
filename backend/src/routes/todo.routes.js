const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller.js');

router.get("/all-todos/", todoController.getAllTodos )
router.get("/get-todo/:id", todoController.getTodoById)

router.post("/create-todo/", todoController.createTodo )

router.put("/update-todo/:id", todoController.updateTodo)

router.delete("/delete-todo/:id", todoController.deleteTodo)



module.exports = router;