import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Status = "doing" | "done";

type TodoItem = {
  id: string;
  text: string;
  status: Status;
};

type TodoState = {
  todos: TodoItem[];
};

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<{ id: string; text: string }>) {
      const doingLength = state.todos.filter(
        (t) => t.status === "doing"
      ).length;
      if (doingLength < 3) {
        const { id, text } = action.payload;
        state.todos.push({ id, text, status: "doing" });
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.todos = state.todos.filter((t) => t.id !== id);
    },
    completeTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo && todo.status === "doing") {
        todo.status = "done";
      }
    },
  },
});

export const { addTodo, deleteTodo, completeTodo } = todoSlice.actions;
export default todoSlice.reducer;
