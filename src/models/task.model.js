import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    categoryIcon: {
      require: true,
      type: String,
      default: "globe-alt",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    startFrom: {
      type: Date,
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;
