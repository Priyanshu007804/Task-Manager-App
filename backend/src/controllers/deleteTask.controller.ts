import type { Response, Request } from "express"
import Task from "../models/task.model.js"

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try{
        const {id}= req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if(!deletedTask){
            res.status(404).json({
                success:false,
                message:"Task not found"
            });
            return;
        }
        


        res.status(200).json({
            success:true,
            message:"Task deleted successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}