import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080"
});

// attach JWT automatically
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    console.log("Token:", token);

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});



// ✅ API FUNCTIONS
export const loginUser = (data) => API.post("/auth/login", data);

export const signupUser = (data) => API.post("/auth/signup", data);

export const getTasks = () => API.get("/api/tasks");

export const addTask = (task) => API.post("/api/tasks", task);

export const updateTask = (id, task) =>
    API.put(`/api/tasks/${id}`, task);

export const deleteTask = (id) =>
    API.delete(`/api/tasks/${id}`);

export default API;