import styles from "./Scrum.module.css";
import { useState } from "react";

const Scrum = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrum}>Scrum</div>
      <div className={styles.container}>
        <div className={styles.col1}>
          <h1 className={styles.title}>TO-DO</h1>
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
        </div>
        <div className={styles.col3}>
          <h1 className={styles.title}>REVIEW</h1>
        </div>
        <div className={styles.col4}>
          <h1 className={styles.title}>DONE</h1>
        </div>
      </div>
    </div>
  );
};

export default Scrum;
