import styles from "./Scrum.module.css";
import { useState, useRef } from "react";
import {
  addTicket,
  toDoing,
  toReview,
  completeTodo,
  deleteTodo,
} from "../../features/scrum/scrumSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";

const Scrum = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.scrum.todos);
  const todo = todos.filter((t) => t.status === "todo");
  const doing = todos.filter((t) => t.status === "doing");
  const review = todos.filter((t) => t.status === "review");
  const done = todos.filter((t) => t.status === "done");
  const id = Date.now().toString();

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    dispatch(addTicket({ id, text: inputValue }));
    setInputValue("");
    inputRef?.current?.focus();
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

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
            onKeyDown={handleEnter}
            ref={inputRef}
          />
          <div className={styles.buttons}>
            <button className={styles.add} onClick={handleAdd}>
              Add
            </button>
          </div>
          <div className={styles.todo}>
            {todo.map((t) => (
              <div className={styles.doing}>
                <h3>{t.text}</h3>
                <div className={styles.icons}>
                  <FiPlusCircle
                    className={styles.checkIcon}
                    onClick={() => dispatch(toDoing(t.id))}
                  />
                  <FaRegTrashAlt
                    className={styles.trashIcon}
                    onClick={() => dispatch(deleteTodo(t.id))}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.col2}>
          <h1 className={styles.title}>DOING</h1>
          {doing.map((t) => (
            <div className={styles.doing}>
              <h3>{t.text}</h3>
              <div className={styles.icons}>
                <FaRegCircleCheck
                  className={styles.checkIcon}
                  onClick={() => dispatch(toReview(t.id))}
                />
                <FaRegTrashAlt
                  className={styles.trashIcon}
                  onClick={() => dispatch(deleteTodo(t.id))}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.col3}>
          <h1 className={styles.title}>REVIEW</h1>
          {review.map((t) => (
            <div className={styles.doing}>
              <h3>{t.text}</h3>
              <div className={styles.icons}>
                <FaRegCircleCheck
                  className={styles.checkIcon}
                  onClick={() => dispatch(completeTodo(t.id))}
                />
                <FaRegTrashAlt
                  className={styles.trashIcon}
                  onClick={() => dispatch(deleteTodo(t.id))}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.col4}>
          <h1 className={styles.title}>DONE</h1>
          {done.map((t) => (
            <div className={styles.doing}>
              <h3>{t.text}</h3>
              <div className={styles.icons}>
                <FaRegTrashAlt
                  className={styles.trashIcon}
                  onClick={() => dispatch(deleteTodo(t.id))}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scrum;
