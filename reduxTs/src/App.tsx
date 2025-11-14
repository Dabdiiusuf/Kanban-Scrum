import "./index.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Boards from "./components/boards/Boards";
import Kanban from "./components/kanban/Kanban";
import Scrum from "./components/scrum/Scrum";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/scrum" element={<Scrum />} />
      </Routes>
    </div>
  );
}

export default App;
