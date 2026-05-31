import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/joinMeeting.css";

import { useRef, useEffect } from "react";
import { io } from "socket.io-client";

import {joinMeeting } from "../api/meetingApi";

import server from "../environment.js";

const JoinMeeting = () => {

    const [roomId, setRoomId] =
        useState("");

    const navigate = useNavigate();

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io(server);
            return () => {
                socketRef.current.disconnect();
            };

        }, []);


    const handleJoinMeeting = async (roomId) => {

        const currentToken = localStorage.getItem("token");

        if (!currentToken) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        if (!roomId) {
            alert("Enter Room ID");
            return;
        }

        try {
            const data = await joinMeeting(roomId);

            console.log("Joined Meeting:", data);

            navigate(`/room/${roomId}`);

        } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Failed to join meeting");
        }
    };

    return (

        <div className="join-container">

            <div className="join-card">

                <h1>
                    Join Meeting
                </h1>

                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={(e) =>
                        setRoomId(
                            e.target.value
                        )
                    }
                    className="join-input"
                />

                <button
                    onClick={() => handleJoinMeeting(roomId)}
                    className="join-btn"
                >
                    Join Meeting
                </button>

            </div>

        </div>
    );
};

export default JoinMeeting;