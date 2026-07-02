import type { Response, Request } from "express";
import Task from "../models/task.model.js";
import { error } from "node:console";


export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description } = req.body;

        if (!title || title.trim() === "") {
            res.status(400).json({
                message: "Title is required"
            })
            return;
        }
        if(!description || description.trim()===""){
            res.status(400).json({
                error:true,
                message:"Task description is required",
            })
        }

        const task = await Task.create({ title, description })
         
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

