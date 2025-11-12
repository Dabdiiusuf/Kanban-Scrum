import styles from "./Toggle.module.css";
import { useState } from "react";
import Kanban from "../kanban/Kanban";
import Scrum from "../scrum/Scrum";

const Toggle = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <div>
      <button className={styles.toggleBtn} onClick={handleToggle}>
        <h3>{toggle ? "Scrum" : "Kanban"}</h3>
      </button>
      {toggle ? <Kanban /> : <Scrum />}
    </div>
  );
};

export default Toggle;
