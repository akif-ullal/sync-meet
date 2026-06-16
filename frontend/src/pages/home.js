import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/home.css";
import { logout } from "./logout";
import { createMeeting } from "../api/meetingApi";
import VideoChatIcon from "@mui/icons-material/VideoChat";

import videoCall from "../assets/icons/video-call.png";
import screenShare from "../assets/icons/screen-share.png";
import chat from "../assets/icons/chat.png";
import security from "../assets/icons/security.png";

const Home = () => {
    const navigate = useNavigate();

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    // START MEETING
    const handleStartMeeting = async () => {
        const currentToken = localStorage.getItem("token");

        if (!currentToken) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {
            const response = await createMeeting();

            const roomId = response?.data?.meeting?.roomId;

            if (!roomId) {
                alert("roomId is undefined");
                return;
            }

            navigate(`/room/${roomId}`);
        } catch (error) {
            console.log("ERROR:", error);

            if (error.response?.status === 401) {

                localStorage.removeItem("token");

                localStorage.removeItem("username");

                alert("Session expired. Please login again.");

                navigate("/login");

                return;
            }
            alert("Failed to create meeting");
        }
    };

    // JOIN MEETING
    const handleJoinMeeting = () => {
        const currentToken = localStorage.getItem("token");

        if (!currentToken) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        navigate("/join");
    };

    // LOGOUT
    const handleLogout = () => {
        logout(navigate, setToken);
    };

    return (
        <div className="home-container">

            {/* NAVBAR */}
            <nav className="navbar">

                <div className="logo">

                    <div className="logo-icon-container">
                        <VideoChatIcon className="logo-icon" />
                    </div>

                    <div className="logo-text">
                        SyncMeet
                    </div>

                </div>

                <div className="nav-actions">

                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="nav-btn logout-btn"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/login")}
                                className="nav-btn"
                            >
                                Login
                            </button>

                            <button
                                onClick={() => navigate("/register")}
                                className="nav-btn primary"
                            >
                                Register
                            </button>
                        </>
                    )}

                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="hero">

                <div className="hero-left">

                    <h1>
                        Connect with anyone, anywhere
                    </h1>

                    <p>
                        High quality video meetings, screen sharing,
                        chat and real-time collaboration built with WebRTC.
                    </p>

                    <div className="hero-buttons">

                        <button
                            onClick={handleStartMeeting}
                            className="btn-green"
                        >
                            Start Meeting
                        </button>

                        <button
                            onClick={handleJoinMeeting}
                            className="btn-gray"
                        >
                            Join Meeting
                        </button>

                    </div>
                </div>

                <div className="hero-right">
                    <img
                        src="/hero-illustration.png"
                        alt="SyncMeet preview"
                    />
                </div>

            </section>

            {/* FEATURES */}
            {/* FEATURES */}
            <section className="features">

                <h2>Features</h2>

                {/* PARENT DIV */}
                <div className="features-grid">

                    <div
                        className="feature-card"
                        style={{ backgroundImage: `url(${videoCall})` }}
                    >
                        <p>HD Video Calls</p>
                    </div>

                    <div
                        className="feature-card"
                        style={{ backgroundImage: `url(${screenShare})` }}
                    >
                        <p>Screen Sharing</p>
                    </div>

                    <div
                        className="feature-card"
                        style={{ backgroundImage: `url(${chat})` }}
                    >
                        <p>Real-time Chat</p>
                    </div>

                    <div
                        className="feature-card"
                        style={{ backgroundImage: `url(${security})` }}
                    >
                        <p>Secure WebRTC</p>
                    </div>

                </div>

            </section>

            {/* FOOTER */}
            <footer className="footer">

                <p>SyncMeet © 2026</p>

                <p>
                    Built using React, Node.js, Socket.IO & WebRTC
                </p>

            </footer>

        </div>
    );
};

export default Home;