import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Room from "./pages/Room";
import Home from "./pages/home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import JoinMeeting from "./pages/JoinMeeting";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* PUBLIC ROUTES */}
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* PROTECTED ROUTES */}
                <Route
                    path="/room/:roomId"
                    element={
                        <ProtectedRoute>
                            <Room />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/join"
                    element={
                        <ProtectedRoute>
                            <JoinMeeting />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;