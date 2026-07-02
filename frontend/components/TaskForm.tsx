"use client";

import { useState } from "react";
import { createTask } from "../lib/api";


export default function TaskForm({onTaskAdded}: {onTaskAdded: () => void}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(!title.trim()){
            alert("Please enter a valid task title");
            return;
        }
        try{
              setLoading(true);
            await createTask(title,description);
            setTitle("");
            setDescription("");
            onTaskAdded();
        }catch(error){
            alert("Failed to add task");
        }finally{
            setLoading(false);
        }
    };

    return(
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input 
                type="text" 
                    value={title} 
                onChange={(e)=>setTitle(e.target.value)} 
                 placeholder="Title" 
                className="border-2 border-gray-300 p-2 rounded-lg"
                />


                <textarea 
                value={description} 
                onChange={(e)=>setDescription(e.target.value)} 
                placeholder="Description" 
                className="border-2 border-gray-300 p-2 rounded-lg"
                />


                <button 
                type="submit" 
                disabled={loading} 
                className="bg-blue-500 text-white p-2 rounded-lg"
                >
                    {loading ? "Adding task..." : "Add Task"}
                </button>
            </form>
        </div>
    );

    
    
    
} 