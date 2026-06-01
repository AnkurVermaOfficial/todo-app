import React, { useEffect, useState } from "react";
import { getTasks, addTask, deleteTask, updateTask } from "./api";

const Dashboard = () => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // 🔄 Fetch tasks on load
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await getTasks();

            console.log("Response:", res.data);

            setTasks(res.data.content || []);
        } catch (err) {
            console.log("Error fetching tasks:", err);
        }
    };

    // ➕ Add Task
    const handleAddTask = async () => {
        if (!newTask.trim()) return;

        try {
            const taskData = {
                title: newTask,
                description: "",
                completed: false
            };

            console.log("Sending:", taskData);

            await addTask(taskData);

            setNewTask("");
            fetchTasks();

        } catch (err) {
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
            console.log("FULL ERROR:", err);
        }
    };

    const handleToggle = async (task) => {
        try {

            await updateTask(task.id, {
                ...task,
                completed: !task.completed
            });

            fetchTasks();

        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = async (task) => {
        try {

            await updateTask(task.id, {
                ...task,
                title: editText
            });

            setEditingId(null);
            setEditText("");

            fetchTasks();

        } catch (err) {
            console.log(err);
        }
    };
    // 🗑 Delete Task
    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks(); // refresh
        } catch (err) {
            console.log("Error deleting task:", err);
        }
    };

    // 🚪 Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className="container mt-5"
            style={{
                minHeight: "100vh",
                backgroundColor: darkMode ? "#121212" : "#f8f9fa",
                color: darkMode ? "white" : "black",
                padding: "20px",
                borderRadius: "10px"
            }}
        >

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </h2>

                <div className="d-flex gap-2">

                    <button
                        className="btn btn-secondary"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

            <div className="row mb-3">

                <div className="col-md-6">
                    <div className="alert alert-primary">
                        Total Tasks: <strong>{totalTasks}</strong>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="alert alert-success">
                        Completed: <strong>{completedTasks}</strong>
                    </div>
                </div>

            </div>

            <div className="card p-3 shadow mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div
                className="card p-4 shadow mb-4"
                style={{
                    backgroundColor: darkMode ? "#1e1e1e" : "white",
                    color: darkMode ? "white" : "black"
                }}
            >
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />

                    <button
                        className="btn btn-primary"
                        onClick={handleAddTask}
                    >
                        Add Task
                    </button>
                </div>
            </div>

            {filteredTasks.length === 0 ? (
                <div className="alert alert-info">
                    No tasks available
                </div>
            ) : (
                filteredTasks.map((task) => (
                    <div
                        key={task.id}
                        className="card shadow-sm mb-3"
                        style={{
                            backgroundColor: darkMode ? "#1e1e1e" : "white",
                            color: darkMode ? "white" : "black"
                        }}
                    >
                        <div className="card-body d-flex justify-content-between align-items-center">

                            <div className="d-flex align-items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggle(task)}
                                />

                                <div>
                                    {
                                        editingId === task.id ? (

                                            <input
                                                className="form-control"
                                                value={editText}
                                                onChange={(e) =>
                                                    setEditText(e.target.value)
                                                }
                                            />

                                        ) : (

                                            <h5
                                                style={{
                                                    textDecoration: task.completed
                                                        ? "line-through"
                                                        : "none",
                                                    color: task.completed
                                                        ? "gray"
                                                        : "black"
                                                }}
                                            >
                                                {task.title}
                                            </h5>

                                        )
                                    }

                                    <small>{task.description}</small>
                                </div>

                            </div>

                            <div className="d-flex gap-2">

                                {
                                    editingId === task.id ? (

                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleEdit(task)}
                                        >
                                            Save
                                        </button>

                                    ) : (

                                        <button
                                            className="btn btn-warning"
                                            onClick={() => {
                                                setEditingId(task.id);
                                                setEditText(task.title);
                                            }}
                                        >
                                            Edit
                                        </button>

                                    )
                                }

                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    </div>
                ))
            )}

        </div>
    );
};

export default Dashboard;