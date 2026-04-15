import taskModel from "../models/task.model.js";
import userModel from "../models/user.model.js";

export default {
  async getTask(req, res) {
    try {
      const userId = req.user.id;
      const taskAll = await taskModel.find({ userId });
      res.status(200).json({
        success: true,
        message: "Tugas telah diambil!",
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
      const { title, category, priority, deadline } = req.body;
      if (!title || !priority || !deadline) {
        return res.status(400).json({
          success: false,
          message: "Field Required, bre!",
          data: null,
        });
      }

      const newTask = await taskModel.create({
        title,
        category,
        priority,
        deadline,
        userId: req.user.id,
      });

      res.status(200).json({
        success: true,
        message: "Tugas berhasil ditambahkan!",
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

  // update task
  // async updateTask(req, res) {
  //   try {
  //     // get id task form req.params
  //     // get title, cat, priority, deadline from req.body
  //     const { id } = req.params;
  //     const { title, category, priority, deadline } = req.body;

  //     // cek task milik user / sort by userId
  //     const userId = req.user.id;
  //     const task = await taskModel.findOne({ _id: id, userId });
  //     if (!task) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Tugas tidak ditemukan!",
  //         data: null,
  //       });
  //     }
  //     // update cuma field yang di kirim, variable uppdate task, fetch with taskModel cari berdasarkan id func and udpdate bawaan mongoose, isi func() : id, object field, { new: true }
  //     const updateTask = await taskModel.findByIdAndUpdate(
  //       id,
  //       { title, category, priority, deadline },
  //       { new: true },
  //     );

  //     // if (!updateTask) {
  //     //   return res.status(404).json({
  //     //     success: false,
  //     //     message: "Tugas tidak ditemukan!",
  //     //     data: null,
  //     //   });
  //     // }
  //     // response status 200, task updated, data: updateTask
  //     res.status(200).json({
  //       success: true,
  //       message: "Tugas berhasil di update!",
  //       data: updateTask,
  //     });
  //   } catch (error) {
  //     //catch error spti biasa, internal server error
  //     res.status(500).json({
  //       success: false,
  //       message: error.message,
  //       data: null,
  //     });
  //   }
  // },

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, category, priority, deadline } = req.body;

      const userId = req.user.id;

      // ✅ FIX DISINI
      const task = await taskModel.findOne({ _id: id, userId });

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Tugas tidak ditemukan",
          data: null,
        });
      }

      const updatedTask = await taskModel.findByIdAndUpdate(
        id,
        { title, category, priority, deadline },
        { returnDocument: "after" },
      );

      res.status(200).json({
        success: true,
        message: "Tugas berhasil diupdate!",
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
          message: "Tugas Tidak ditemukan",
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
          message: "Tugas tidak ditemukan!",
          data: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "Tugas berhasil dihapus!",
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
