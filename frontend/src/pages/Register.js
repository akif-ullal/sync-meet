import { useState } from "react";
import "../styles/register.css";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await registerUser(form);

            alert("Registered Successfully");
            navigate("/login");

        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="register-container">

            <div className="register-card">

                <h2 className="register-title">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        className="register-input"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />

                    <input
                        className="register-input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <input
                        className="register-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="register-btn"
                    >
                        Register
                    </button>

                    <p className="egister-auth-text">
                        Already have an account?
                        <span
                            className="register-auth-link"
                            onClick={() => navigate("/login")}
                        >
                            {" "}Login
                        </span>
                    </p>

                </form>

            </div>

        </div>
    );
};

export default Register;