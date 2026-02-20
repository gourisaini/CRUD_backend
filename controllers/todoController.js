import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import Todo from "../models/todoModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const getAllTodos = catchAsyncErrors(async (req, res, next) => {
  const { page = 1, limit = 10, completed, priority } = req.query;

  const filter = {};
  if (completed !== undefined) filter.completed = completed === "true";
  if (priority) filter.priority = priority;

  const todos = await Todo.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Todo.countDocuments(filter);

  res.status(200).json({
    success: true,
    todos,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    total,
  });
});

export const getTodoById = catchAsyncErrors(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found", 404));
  }

  res.status(200).json({
    success: true,
    todo,
  });
});

export const createTodo = catchAsyncErrors(async (req, res, next) => {
  const todoData = {
    ...req.body,
    user: req.id,
  };

  const todo = await Todo.create(todoData);

  res.status(201).json({
    success: true,
    message: "Todo created successfully",
    todo,
  });
});

export const updateTodo = catchAsyncErrors(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found", 404));
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Todo updated successfully",
    todo: updatedTodo,
  });
});

export const deleteTodo = catchAsyncErrors(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found", 404));
  }

  await Todo.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
  });
});

export const toggleTodoStatus = catchAsyncErrors(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found", 404));
  }

  todo.completed = !todo.completed;
  await todo.save();

  res.status(200).json({
    success: true,
    message: "Todo status updated successfully",
    todo,
  });
});
