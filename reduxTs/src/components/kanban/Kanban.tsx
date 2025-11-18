import styles from "./Kanban.module.css";
import { useState, useRef, useEffect } from "react";
import {
  fetchTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  moveTicket,
} from "../../features/todo/todoSlice";
import {
  selectTodo,
  selectDoing,
  selectDone,
  selectCount,
} from "../../features/todo/todoSelectors";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import type { Status } from "../../features/todo/todoSlice";
import { useNavigate } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

const Kanban = () => {
  const [inputValue, setInputValue] = useState("");
  const [draft, setDraft] = useState("");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const todo = useAppSelector(selectTodo);
  const doing = useAppSelector(selectDoing);
  const done = useAppSelector(selectDone);
  const count = useAppSelector(selectCount);
  const items = useAppSelector((state) => state.todo.items);

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);

  const handleAdd = () => {
    dispatch(createTicket({ text: inputValue, status: "todo" }));
    setInputValue("");
    inputRef?.current?.focus();
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTicket(id));
  };

  const handleUpdate = (id: string, status: Status) => {
    dispatch(updateTicket({ id, text: draft, status }));
    setIsEditing(null);
  };

  const handleEdit = (id: string, currentText: string) => {
    setIsEditing(id);
    setDraft(currentText);
  };

  const handleBoardChange = () => {
    navigate("/scrum");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.kanban}>Kanban</div>
      <button className={styles.toggleBtn} onClick={handleBoardChange}>
        Scrum
      </button>
      <div className={styles.container}>
        {/* FIRST COLUMN START*/}
        <div
          className={styles.col1}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData("text/plain");
            const ticket = items.find((t) => t.id === id);
            if (!ticket) return;
            dispatch(
              updateTicket({
                id: ticket.id,
                text: ticket.text,
                status: "todo",
              })
            );
          }}
        >
          <h1 className={styles.title}>TO-DO</h1>
          <input
            type="text"
            className={styles.addInput}
            placeholder="Add your to-do"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
            onKeyDown={handleEnter}
          />
          <div className={styles.buttons}>
            <button className={styles.add} onClick={handleAdd}>
              Add
            </button>
          </div>
          <div className={styles.todo}>
            {todo.map((t, index) => (
              <div
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", t.id);
                }}
                key={index}
                className={styles.doing}
              >
                {t.id === isEditing ? (
                  <div className={styles.ticketWrapper}>
                    <input
                      type="text"
                      className={styles.editInput}
                      placeholder="Edit your to-do"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                    />
                    <div className={styles.icons}>
                      <FaRegCircleCheck
                        className={styles.icon}
                        onClick={() => handleUpdate(t.id, t.status)}
                      />
                      <FaRegTrashAlt
                        className={styles.icon}
                        onClick={() => handleDelete(t.id)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.ticketWrapper}>
                    <h3>{t.text}</h3>
                    <div className={styles.icons}>
                      <FiPlusCircle
                        className={styles.icon}
                        onClick={() => dispatch(moveTicket(t.id))}
                      />
                      <MdOutlineEdit
                        className={styles.icon}
                        onClick={() => handleEdit(t.id, t.text)}
                      />
                      <FaRegTrashAlt
                        className={styles.icon}
                        onClick={() => handleDelete(t.id)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* FIRST COLUMN END*/}
        <div
          className={styles.col2}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData("text/plain");
            const ticket = items.find((t) => t.id === id);
            if (!ticket) return;
            if (count <= 2) {
              dispatch(
                updateTicket({
                  id: ticket.id,
                  text: ticket.text,
                  status: "doing",
                })
              );
            }
          }}
        >
          <h1 className={styles.title}>DOING {count}/3</h1>
          <div className={styles.todo}>
            {doing.map((t, index) => (
              <div
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", t.id);
                }}
                key={index}
                className={styles.doing}
              >
                {t.id === isEditing ? (
                  <div className={styles.ticketWrapper}>
                    <input
                      type="text"
                      className={styles.editInput}
                      placeholder="Edit your to-do"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                    />
                    <div className={styles.icons}>
                      <FaRegCircleCheck
                        className={styles.icon}
                        onClick={() => handleUpdate(t.id, t.status)}
                      />
                      <FaRegTrashAlt
                        className={styles.icon}
                        onClick={() => handleDelete(t.id)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.ticketWrapper}>
                    <h3>{t.text}</h3>
                    <div className={styles.icons}>
                      <FaRegCircleCheck
                        className={styles.icon}
                        onClick={() => dispatch(moveTicket(t.id))}
                      />
                      <MdOutlineEdit
                        className={styles.icon}
                        onClick={() => handleEdit(t.id, t.text)}
                      />
                      <FaRegTrashAlt
                        className={styles.icon}
                        onClick={() => handleDelete(t.id)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          className={styles.col3}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData("text/plain");
            const ticket = items.find((t) => t.id === id);
            if (!ticket) return;
            dispatch(
              updateTicket({
                id: ticket.id,
                text: ticket.text,
                status: "done",
              })
            );
          }}
        >
          <h1 className={styles.title}>DONE</h1>
          <div className={styles.todo}>
            {done.map((t, index) => (
              <div
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", t.id);
                }}
                key={index}
                className={styles.doing}
              >
                <h3>{t.text}</h3>
                <div className={styles.icons}>
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
