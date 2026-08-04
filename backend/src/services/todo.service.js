const Todo = require("../models/todo.model");
const mongoose = require("mongoose");

const createTodo = async ({ title, description }) => {
  if (!title || !description) {
    throw new Error("Title and description are required.");
  }

  const todo = await Todo.create({
    title: title.trim(),
    description: description.trim(),
  });

  return todo;
};

const getAllTodos = async () => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  return todos;
};

const getTodoById = async (todoId) => {
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    throw new Error("Invalid Todo ID");
  }

  const todo = await Todo.findById(todoId);

  if (!todo) {
    throw new Error("Todo not found");
  }

  return todo;
};

const updateTodo = async (todoId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    throw new Error("Invalid Todo ID");
  }

  const todo = await Todo.findByIdAndUpdate(todoId, updateData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  return todo;
};

const deleteTodo = async (todoId) => {
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    throw new Error("Invalid Todo ID");
  }

  const todo = await Todo.findByIdAndDelete(todoId);

  if (!todo) {
    throw new Error("Todo not found");
  }

  return todo;
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
