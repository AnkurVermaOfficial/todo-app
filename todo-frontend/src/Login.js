import React, { useState } from "react";
import { loginUser } from "./api";
import API from "./api";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data ={
                username,
                password
            };

            console.log("Sending:",data);

            const res = await API.post("/auth/login",{
                username,
                password
            });

            console.log("Username:", username);
            console.log("Password:", password);

            // ✅ Save token
            localStorage.setItem("token", res.data);

            alert("Login Successful ✅");

            // 👉 redirect (we'll improve later)
            window.location.href = "/dashboard";

        } catch (err) {
            console.log("Error Response:", err.response);
            console.log("Error Data:", err.response?.data);
            alert("Login Failed");
        }
    };



    return (
        <div className="container">

            <div
                className="card shadow p-4 mx-auto mt-5"
                style={{ maxWidth: "400px" }}
            >

                <h2 className="text-center mb-4">
                    🔐 Login
                </h2>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        </div>
    );
};

export default Login;