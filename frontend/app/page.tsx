"use client"
import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"
import { useState } from "react"
export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded=()=>{
    setRefresh(prev => !prev);
  };
  
  return (
      <main className="min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Task Manager</h1>

        <div className="max-w-3xl mx-auto">
          <TaskForm onTaskAdded={handleTaskAdded} />

          <TaskList refresh={refresh}/>
        </div>
      </main>
  );
}
