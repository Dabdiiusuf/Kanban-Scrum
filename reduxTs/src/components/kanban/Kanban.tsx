import styles from "./Kanban.module.css";
import { useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  moveTodo,
  addTodo,
  deleteTodo,
  completeTodo,
} from "../../features/todo/todoSlice";
import {
  selectTodo,
  selectDoing,
  selectDone,
  selectDoingCount,
} from "../../features/todo/todoSelectors";
import { FaRegTrashAlt } from "react-icons/fa";
// import { MdOutlineEdit } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";

const Kanban = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const id = Date.now().toString();
  const todo = useAppSelector(selectTodo);
  const doing = useAppSelector(selectDoing);
  const done = useAppSelector(selectDone);
  const count = useAppSelector(selectDoingCount);

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    dispatch(addTodo({ id, text: inputValue }));
    inputRef?.current?.focus();
    setInputValue("");
    console.log("todo added");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

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
            onKeyDown={handleEnter}
            ref={inputRef}
          />
          <div className={styles.buttons}>
            <button className={styles.add} onClick={handleAdd}>
              Add
            </button>
          </div>
          <div className={styles.todo}>
            {todo.map((t, index) => (
              <div key={index} className={styles.doing}>
                <h3>{t.text}</h3>
                <div className={styles.icons}>
                  <FiPlusCircle
                    className={styles.checkIcon}
                    onClick={() => dispatch(moveTodo(t.id))}
                  />
                  {/* <MdOutlineEdit className="pen-icon" /> */}
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
          <h1 className={styles.title}>DOING {count}/3</h1>
          {doing.map((t, index) => (
            <div key={index} className={styles.doing}>
              <h3>{t.text}</h3>
              <div className={styles.icons}>
                <FaRegCircleCheck
                  className={styles.checkIcon}
                  onClick={() => dispatch(completeTodo(t.id))}
                />
                {/* <MdOutlineEdit className="pen-icon" /> */}
                <FaRegTrashAlt
                  className={styles.trashIcon}
                  onClick={() => dispatch(deleteTodo(t.id))}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.col3}>
          <h1 className={styles.title}>DONE</h1>
          {done.map((t, index) => (
            <div key={index} className={styles.done}>
              <h3>{t.text}</h3>
              <div className={styles.icons}>
                {/* <MdOutlineEdit className="pen-icon" /> */}
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

export default Kanban;
