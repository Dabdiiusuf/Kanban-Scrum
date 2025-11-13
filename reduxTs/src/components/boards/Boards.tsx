import styles from "./Boards.module.css";
import { useNavigate } from "react-router-dom";

const Boards = () => {
  const navigate = useNavigate();

  const handleKanban = () => {
    navigate("/kanban");
  };

  const handleScrum = () => {
    navigate("/scrum");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Chose what board you want</h1>
        <div className={styles.buttonWrapper}>
          <button className={styles.kanban} onClick={handleKanban}>
            Kanban
          </button>
          <button className={styles.scrum} onClick={handleScrum}>
            Scrum
          </button>
        </div>
      </div>
    </div>
  );
};

export default Boards;
