import {
    Box,
    TextField,
    Typography,
    Paper
} from "@mui/material";

import { useState } from "react";

import "../styles/login.css";

import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

         if (!form.email || !form.password) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await loginUser(form);

            console.log(res.data);

            // store token
            localStorage.setItem("token", res.data.token);

            // STORE USERNAME
            localStorage.setItem("username",res.data.user.username);

            alert("Login Successful");

            
            setForm({
                email: "",
                password: ""
            });

            navigate("/"); // or /room

        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data.message);
        }
    };

    return (

        <Box className="login-container">

            <Paper className="login-card">

                <Typography className="login-title">
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Login
                    </button>

                    <p className="auth-text">
                        Don't have an account?
                        <span
                            className="auth-link"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </span>
                    </p>

                </form>

            </Paper>

        </Box>
    );
};

export default Login;