import styles from "./Scrum.module.css";
import { useState, useRef } from "react";
import {
  addTicket,
  moveTicket,
  returnTicket,
  deleteTicket,
  updateTicket,
} from "../../features/scrum/scrumSlice";
import {
  selectTodo,
  selectReview,
  selectDoing,
  selectDone,
} from "../../features/scrum/scrumSelectors";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoMdReturnLeft } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

const Scrum = () => {
  const [inputValue, setInputValue] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const todo = useAppSelector(selectTodo);
  const doing = useAppSelector(selectDoing);
  const review = useAppSelector(selectReview);
  const done = useAppSelector(selectDone);
  const id = Date.now().toString();

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    dispatch(addTicket({ id, text: inputValue }));
    setInputValue("");
    inputRef?.current?.focus();
  };

  const startEdit = (id: string, currentText: string) => {
    setEditId(id);
    setUpdateValue(currentText);
  };

  const handleUpdate = () => {
    if (!editId) return;
    if (!updateValue.trim()) return;
    dispatch(updateTicket({ id: editId, newText: updateValue }));
    setEditId(null);
    setUpdateValue("");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

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
                {t.id === editId ? (
                  <div className={styles.ticketWrapper}>
                    <input
                      type="text"
                      className={styles.addInput}
                      placeholder="Edit your to-do"
                      value={updateValue}
                      onChange={(e) => setUpdateValue(e.target.value)}
                    />
                    <div className={styles.icons}>
                      <FaRegCircleCheck
                        className={styles.checkIcon}
                        onClick={handleUpdate}
                      />
                      <FaRegTrashAlt
                        className={styles.trashIcon}
                        onClick={() => dispatch(deleteTicket(t.id))}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.ticketWrapper}>
                    <h3>{t.text}</h3>
                    <div className={styles.icons}>
                      <FiPlusCircle
                        className={styles.checkIcon}
                        onClick={() => dispatch(moveTicket(t.id))}
                      />
                      <MdOutlineEdit
                        className={styles.checkIcon}
                        onClick={() => startEdit(t.id, t.text)}
                      />
                      <FaRegTrashAlt
                        className={styles.trashIcon}
                        onClick={() => dispatch(deleteTicket(t.id))}
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
          {doing.map((t, index) => (
            <div key={index} className={styles.doing}>
              <h3>{t.text}</h3>
              <div className={styles.icons}>
                <FaRegCircleCheck
                  className={styles.checkIcon}
                  onClick={() => dispatch(moveTicket(t.id))}
                />
                <IoMdReturnLeft
                  className={styles.checkIcon}
                  onClick={() => dispatch(returnTicket(t.id))}
                />
                <FaRegTrashAlt
                  className={styles.trashIcon}
                  onClick={() => dispatch(deleteTicket(t.id))}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.col3}>
          <h1 className={styles.title}>REVIEW</h1>
          {review.map((t, index) => (
            <div key={index} className={styles.doing}>
              <h3>{t.text}</h3>
              <div className={styles.icons}>
                <FaRegCircleCheck
                  className={styles.checkIcon}
                  onClick={() => dispatch(moveTicket(t.id))}
                />
                <IoMdReturnLeft
                  className={styles.checkIcon}
                  onClick={() => dispatch(returnTicket(t.id))}
                />
                <FaRegTrashAlt
                  className={styles.trashIcon}
                  onClick={() => dispatch(deleteTicket(t.id))}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.col4}>
          <h1 className={styles.title}>DONE</h1>
          {done.map((t, index) => (
            <div key={index} className={styles.doing}>
              <h3>{t.text}</h3>
              <div className={styles.icons}>
                <IoMdReturnLeft
                  className={styles.checkIcon}
                  onClick={() => dispatch(returnTicket(t.id))}
                />
                <FaRegTrashAlt
                  className={styles.trashIcon}
                  onClick={() => dispatch(deleteTicket(t.id))}
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
