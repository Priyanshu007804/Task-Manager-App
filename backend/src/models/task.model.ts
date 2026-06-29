import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
    title: string;
    isCompleted: boolean;
    description:string;
    
}

const TaskSchema = new Schema<ITask>(
    {
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    description:{
        type: String,
        required: true
    }
    }, 
    {
        timestamps: true,
    });
const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;