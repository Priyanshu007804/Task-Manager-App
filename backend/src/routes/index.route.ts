import express from "express"
import { createTask } from "../controllers/addTask.controller.js"
import { getTasks } from "../controllers/getTask.controller.js"
import { updateTask } from "../controllers/updateTask.controller.js"
import { deleteTask } from "../controllers/deleteTask.controller.js"
import { taskCompletion } from "../controllers/taskCompletion.controller.js"

const router = express.Router();

router.post("/create",createTask)
router.get("/get",getTasks)
router.patch("/update/:id",updateTask)
router.delete("/delete/:id",deleteTask)
router.patch("/completion/:id",taskCompletion)

export default router;