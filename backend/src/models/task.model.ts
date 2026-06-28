import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
    title: string;
    isCompleted: boolean;
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
    }
    }, 
    {
        timestamps: true,
    });
const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;