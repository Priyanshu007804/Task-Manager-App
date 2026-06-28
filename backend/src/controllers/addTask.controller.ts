import type { Response, Request } from "express";
import Task from "../models/task.model.js";


export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            res.status(400).json({
                message: "Title is required"
            })
            return;
        }

        const task = await Task.create({ title })
         
        res.status(201).json({
            success:true,
            message: "Task created successfully",
            data: task
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message: "Internal server error"
        })
    }
}

