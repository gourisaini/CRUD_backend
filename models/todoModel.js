import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [100, "Title should not exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, "Description should not exceed 500 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: String,
    },
  },
  { timestamps: true },
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
