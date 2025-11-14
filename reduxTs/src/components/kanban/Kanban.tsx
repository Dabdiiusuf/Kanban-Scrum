import styles from "./Kanban.module.css";
import { useState, useRef, useEffect } from "react";
import {
  fetchTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  moveTicket,
} from "../../features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

const Kanban = () => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  // const kanbanTickets = useAppSelector((state) => state.todo.items);
  const todo = useAppSelector((state) => {
    return state.todo.items.filter((t) => t.status === "todo");
  });
  const doing = useAppSelector((state) =>
    state.todo.items.filter((t) => t.status === "doing")
  );
  const done = useAppSelector((state) =>
    state.todo.items.filter((t) => t.status === "done")
  );

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  const handleAdd = () => {
    dispatch(createTicket({ text: inputValue, status: "todo" }));
    setInputValue("");
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTicket(id));
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
                    className={styles.icon}
                    onClick={() => dispatch(moveTicket(t.id))}
                  />
                  <MdOutlineEdit className={styles.icon} />
                  <FaRegTrashAlt
                    className={styles.icon}
                    onClick={() => handleDelete(t.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.col2}>
          <h1 className={styles.title}>DOING .../3</h1>
          <div className={styles.todo}>
            {doing.map((t, index) => (
              <div key={index} className={styles.doing}>
                <h3>{t.text}</h3>
                <div className={styles.icons}>
                  <FaRegCircleCheck
                    className={styles.icon}
                    onClick={() => dispatch(moveTicket(t.id))}
                  />
                  <MdOutlineEdit className={styles.icon} />
                  <FaRegTrashAlt
                    className={styles.icon}
                    onClick={() => handleDelete(t.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.col3}>
          <h1 className={styles.title}>DONE</h1>
          <div className={styles.todo}>
            {done.map((t, index) => (
              <div key={index} className={styles.doing}>
                <h3>{t.text}</h3>
                <div className={styles.icons}>
                  <MdOutlineEdit className={styles.icon} />
                  <FaRegTrashAlt
                    className={styles.icon}
                    onClick={() => handleDelete(t.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
