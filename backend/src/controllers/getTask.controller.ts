import type { Response, Request } from "express";
import Task from "../models/task.model.js";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await Task.find().sort({createdAt: -1});

        if (tasks.length === 0) {
            res.status(200).json({
                success:true,
                message: "No tasks found",
                data: []
            });
            return;
        }

        res.status(200).json({
            success:true,
            message: "Tasks fetched successfully",
            data: tasks
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message: "Internal server error"
        })
    }
}