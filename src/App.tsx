import "./index.css";
import { useState } from "react";
import Kanban from "./components/kanban/Kanban";
import Scrum from "./components/scrum/Scrum";

function App() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="wrapper">
      <button className="togglebtn" onClick={handleToggle}>
        {toggle ? "Kanban" : "Scrum"}
      </button>
      {toggle ? <Scrum /> : <Kanban />}
    </div>
  );
}

export default App;
