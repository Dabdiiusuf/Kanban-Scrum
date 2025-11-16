import styles from "./Scrum.module.css";
import { useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
// import { FiPlusCircle } from "react-icons/fi";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { FaRegCircleCheck } from "react-icons/fa6";
// import { IoMdReturnLeft } from "react-icons/io";
// import { MdOutlineEdit } from "react-icons/md";

const Scrum = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = Date.now().toString();

  const handleBoardChange = () => {
    navigate("/kanban");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrum}>Scrum</div>
      <button className={styles.toggleBtn} onClick={handleBoardChange}>
        Kanban
      </button>
      <div className={styles.container}>
        <div className={styles.col1}>
          <h1 className={styles.title}>Backlog</h1>
          <input
            type="text"
            className={styles.addInput}
            placeholder="Add your to-do"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className={styles.buttons}>
            <button className={styles.add}>Add</button>
          </div>
          <div className={styles.todo}></div>
        </div>
        <div className={styles.col2}>
          <h1 className={styles.title}>DOING</h1>
          <div className={styles.todo}></div>
        </div>
        <div className={styles.col3}>
          <h1 className={styles.title}>REVIEW</h1>
          <div className={styles.todo}></div>
        </div>
        <div className={styles.col4}>
          <h1 className={styles.title}>DONE</h1>
          <div className={styles.todo}></div>
        </div>
      </div>
    </div>
  );
};

export default Scrum;
