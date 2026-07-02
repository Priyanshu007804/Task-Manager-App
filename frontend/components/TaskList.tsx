import { useState, useEffect } from "react";
import { deleteTask, fetchTasks, updateTask, taskCompletion } from "@/lib/api";
import type { Task } from "@/wrappers/types/task";

interface TaskListProps {
    refresh: boolean;
}

export default function TaskList({ refresh }: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const loadTasks = async () => {
        try {
            const response = await fetchTasks();
            if (response.success) {
                setTasks(response.data);
            }
        } catch (error) {
            console.error("Failed to load tasks", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, [refresh]);

    const startEditing = (task: Task) => {
        setEditingTaskId(task._id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditTitle("");
        setEditDescription("");
    };

    const handleSaveEdit = async (id: string) => {
        try {
            await updateTask(id, editTitle, editDescription);
            setEditingTaskId(null);
            loadTasks();
        } catch (error) {
            console.error("Failed to update task", error);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await deleteTask(id);
            loadTasks();
        } catch (error) {
            console.error("Failed to delete task", error);
        }
    };

    const handleToggleCompletion = async (id: string) => {
        try {
            await taskCompletion(id);
            loadTasks();
        } catch (error) {
            console.error("Failed to toggle task completion", error);
        }
    };

    if (loading && tasks.length === 0) return <div>Loading tasks...</div>;
    if (tasks.length === 0) return <div>No tasks available.</div>;

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div key={task._id} className="p-4 border rounded shadow-sm bg-white">
                    {editingTaskId === task._id ? (
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="border border-gray-300 p-2 rounded"
                            />
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="border border-gray-300 p-2 rounded"
                            />
                            <div className="mt-2 space-x-2">
                                <button onClick={() => handleSaveEdit(task._id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                                    Save
                                </button>
                                <button onClick={cancelEditing} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    checked={task.isCompleted} 
                                    onChange={() => handleToggleCompletion(task._id)}
                                    className="w-5 h-5 cursor-pointer accent-blue-500"
                                />
                                <h3 className={`text-lg font-bold ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>
                                    {task.title}
                                </h3>
                            </div>
                            <p className="text-gray-600 mt-1">{task.description}</p>
                            <div className="mt-4 space-x-2">
                                <button onClick={() => startEditing(task)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteTask(task._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
