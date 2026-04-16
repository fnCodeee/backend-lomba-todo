import taskModel from "../models/task.model.js";
import userModel from "../models/user.model.js";

export default {
  async getTask(req, res) {
    try {
      const userId = req.user.id;
      const taskAll = await taskModel.find({ userId });
      res.status(200).json({
        success: true,
        message: "Success get task!",
        data: taskAll,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  },

  async createTask(req, res) {
    try {
      const { title, category, priority, deadline, startFrom } = req.body;
      if (!title || !priority || !deadline || !startFrom) {
        return res.status(400).json({
          success: false,
          message: "Please fill all field!",
          data: null,
        });
      }

      if (new Date(startFrom) > new Date(deadline)) {
        return res.status(400).json({
          succses: false,
          message: "Deadline must be greater than start from",
          data: null,
        });
      }

      const newTask = await taskModel.create({
        title,
        category,
        priority,
        deadline,
        startFrom,
        userId: req.user.id,
      });

      res.status(200).json({
        success: true,
        message: "Success create task!",
        data: newTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Internal Server Error!: ${error.message}`,
        data: null,
      });
    }
  },

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, category, priority, deadline, startFrom } = req.body;

      const userId = req.user.id;
      const task = await taskModel.findOne({ _id: id, userId });

      const updateData = {};
      if (title) updateData.title = title;
      if (priority) updateData.priority = priority;
      if (deadline) updateData.deadline = deadline;
      if (category) updateData.category = category;
      if (startFrom) updateData.startFrom = startFrom;

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found!",
          data: null,
        });
      }

      const updatedTask = await taskModel.findByIdAndUpdate(id, updateData, {
        returnDocument: "after",
      });

      res.status(200).json({
        success: true,
        message: "Success update task!",
        data: updatedTask,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  },

  // patch status done
  async markAsDone(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const afterMark = await taskModel.findByIdAndUpdate(
        id,
        { isDone: true },
        { returnDocument: "after" },
      );
      if (!afterMark) {
        return res.status(404).json({
          success: false,
          message: "Task not found!",
          data: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "Tugas telah ditandai!",
        data: afterMark,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  },

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const deleteTask = await taskModel.findOneAndDelete({
        _id: id,
        userId,
      });
      if (!deleteTask) {
        return res.status(404).json({
          success: true,
          message: "Task not found!",
          data: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "Success delete task!",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null,
      });
    }
  },
};
