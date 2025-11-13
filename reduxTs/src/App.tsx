import "./index.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Toggle from "./components/toggle/Toggle";
import Boards from "./components/boards/Boards";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/toggle" element={<Toggle />} />
      </Routes>
    </div>
  );
}

export default App;
