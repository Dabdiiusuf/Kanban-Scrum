import styles from "./Kanban.module.css";
import { useState, useRef } from "react";
// import { useAppDispatch } from "../../app/hooks";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { MdOutlineEdit } from "react-icons/md";
// import { FaRegCircleCheck } from "react-icons/fa6";
// import { FiPlusCircle } from "react-icons/fi";

const Kanban = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.kanban}>Kanban</div>
      <div className={styles.container}>
        <div className={styles.col1}>
          <h1 className={styles.title}>TO-DO</h1>
          <input
            type="text"
            className={styles.addInput}
            placeholder="Add your to-do"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
          />
          <div className={styles.buttons}>
            <button className={styles.add}>Add</button>
          </div>
          <div className={styles.todo}></div>
        </div>
        <div className={styles.col2}>
          <h1 className={styles.title}>DOING .../3</h1>
        </div>
        <div className={styles.col3}>
          <h1 className={styles.title}>DONE</h1>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
