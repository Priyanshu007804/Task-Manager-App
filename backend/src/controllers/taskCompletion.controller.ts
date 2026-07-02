import type { Response, Request } from "express";
import Task from "../models/task.model.js";



export const taskCompletion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const foundTask = await Task.findById(id);
        if (!foundTask) {
            res.status(404).json({
                success: false,
                message: "Task not found"
            });
            return;
        }

        foundTask.isCompleted = !foundTask.isCompleted;
        await foundTask.save();
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: foundTask
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
