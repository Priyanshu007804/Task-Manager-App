import { connectBackend } from "@/common";
import type{Task} from "@/wrappers/types/task"

interface FetchTasksResponse{
    success:boolean;
    message:string;
    data: Task[];
}

export const createTask= async (title:string, description:string)=>{
    const {url, method} = connectBackend.createTask;
    try{
        const response = await fetch(url, {
            method,
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({title, description})
        });
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const fetchTasks = async():Promise<FetchTasksResponse> =>{
    const {url, method} = connectBackend.getTask;
    try{
        const response = await fetch(url, {method});
        const data = await response.json();
        return data;

    }catch(error){
        console.log(error);
        throw error;
    }
}


export const updateTask = async (id:string, title:string, description:string)=>{
    const {url, method} = connectBackend.updateTask(id);
    try{
        const response = await fetch(url, {
            method,
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({title, description})
        });
        const data = await response.json();
        return data;

    }catch(error){
        console.log(error);
        throw error;
    }
}

export const deleteTask = async (id:string)=>{
    const {url, method} = connectBackend.deleteTask(id);
    try{
        const response = await fetch(url, {method});
        const data = await response.json();
        return data;

    }catch(error){
        console.log(error);
        throw error;
    }
}

export const taskCompletion = async (id:string)=>{
    const {url, method} = connectBackend.taskCompletion(id);
    try{
        const response = await fetch(url, {method});
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
        throw error;
    }
}