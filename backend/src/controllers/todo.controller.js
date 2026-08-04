const logger = require("../config/logger");
const todoService = require("../services/todo.service");

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Request Validation
    if (!title || !description) {
      logger.warn("Validation failed: title or description missing");
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    if (typeof title !== "string" || typeof description !== "string") {
      logger.warn("Validation failed: title or description is not a string");
      return res.status(400).json({
        success: false,
        message: "Title and description must be strings.",
      });
    }

    if (title.trim().length < 3 || title.trim().length > 100) {
      logger.warn("Validation failed: title is not within the required length");
      return res.status(400).json({
        success: false,
        message: "Title must be between 3 and 100 characters.",
      });
    }

    if (description.trim().length < 3 || description.trim().length > 100) {
      logger.warn(
        "Validation failed: description is not within the required length",
      );
      return res.status(400).json({
        success: false,
        message: "Description must be between 3 and 100 characters.",
      });
    }

    const todo = await todoService.createTodo({
      title,
      description,
    });

    logger.info({ todoId: todo._id }, "Todo created successfully");

    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();

    logger.info({ count: todos.length }, "Fetched all todos");

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await todoService.getTodoById(todoId);

    logger.info({ todoId }, "Fetched todo");

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};
const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    const { title, description, completed } = req.body;

    const updateData = {};

    if (title !== undefined) {
      updateData.title = title.trim();
    }

    if (description !== undefined) {
      updateData.description = description.trim();
    }

    if (completed !== undefined) {
      updateData.completed = completed;
    }

    // Optional: don't allow empty update request
    if (Object.keys(updateData).length === 0) {
      logger.warn("Update request has no valid fields");
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update.",
      });
    }

    const todo = await todoService.updateTodo(todoId, updateData);

    logger.info({ todoId }, "Todo updated");

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    await todoService.deleteTodo(todoId);

    logger.info({ todoId }, "Todo deleted");

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
