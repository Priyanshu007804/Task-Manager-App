const backend_url = process.env.BACKEND_URL;

export const connectBackend = {
    createTask: {
        url: `${backend_url}/api/v1/create`,
        method: "POST",
    },
    getTask: {
        url: `${backend_url}/api/v1/get`,
        method: "GET",
    },
    updateTask: (id:string)=>({
        url: `${backend_url}/api/v1/update/${id}`,
        method: "PATCH",
    }),
    deleteTask: (id:string)=>({
        url: `${backend_url}/api/v1/delete/${id}`,
        method: "DELETE",
    }),
}