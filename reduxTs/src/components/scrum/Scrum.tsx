import styles from "./Scrum.module.css";
import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  selectTodo,
  selectDoing,
  selectReview,
  selectDone,
} from "../../features/scrum/scrumSelectors";
import {
  getScrumTickets,
  createScrumTicket,
  updateScrumTicket,
  deleteScrumTicket,
  moveTicket,
} from "../../features/scrum/scrumSlice";
import type { Status } from "../../features/scrum/scrumSlice";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
// import { IoMdReturnLeft } from "react-icons/io";

const Scrum = () => {
  const [inputValue, setInputValue] = useState("");
  const [draft, setDraft] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const todo = useAppSelector(selectTodo);
  const doing = useAppSelector(selectDoing);
  const review = useAppSelector(selectReview);
  const done = useAppSelector(selectDone);

  const handleBoardChange = () => {
    navigate("/kanban");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  const handleEdit = (id: string, currentText: string) => {
    setDraft(currentText);
    setEditId(id);
  };

  const handleUpdate = (id: string, status: Status) => {
    dispatch(updateScrumTicket({ id, text: draft, status }));
    setEditId(null);
  };

  useEffect(() => {
    dispatch(getScrumTickets());
  }, []);

  const handleCreate = () => {
    dispatch(createScrumTicket({ text: inputValue, status: "todo" }));
    setInputValue("");
    inputRef?.current?.focus();
  };

  const handleDelete = (id: string) => {
    dispatch(deleteScrumTicket(id));
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
            ref={inputRef}
            onKeyDown={handleEnter}
          />
          <div className={styles.buttons}>
            <button className={styles.add} onClick={handleCreate}>
              Add
            </button>
          </div>
          <div className={styles.todo}>
            {todo.map((t, index) => (
              <div className={styles.doing} key={index}>
                {t.id === editId ? (
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
        <div className={styles.col2}>
          <h1 className={styles.title}>DOING</h1>
          <div className={styles.todo}>
            {doing.map((t, index) => (
              <div className={styles.doing} key={index}>
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
        <div className={styles.col3}>
          <h1 className={styles.title}>REVIEW</h1>
          <div className={styles.todo}>
            {review.map((t, index) => (
              <div className={styles.doing} key={index}>
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
        <div className={styles.col4}>
          <h1 className={styles.title}>DONE</h1>
          <div className={styles.todo}>
            {done.map((t, index) => (
              <div className={styles.doing} key={index}>
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

export default Scrum;
