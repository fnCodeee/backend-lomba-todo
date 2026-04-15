import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import taskController from "../controllers/task.controller.js";
const router = Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authMiddleware, authController.me);
router.get("/date", (req, res) => {
  res.json({ date: Date()})
})


router.get("/token", authController.dummy)
router.get("/tasks", authMiddleware, taskController.getTask);
router.post("/tasks", authMiddleware, taskController.createTask);
router.patch("/tasks/:id/update", authMiddleware, taskController.updateTask)
router.patch("/tasks/:id/done", authMiddleware, taskController.markAsDone);
router.delete("/tasks/:id/delete", authMiddleware, taskController.deleteTask);
export default router;
