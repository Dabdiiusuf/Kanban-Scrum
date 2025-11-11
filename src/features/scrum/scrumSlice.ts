import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Status = "todo" | "doing" | "review" | "done";

type ScrumItem = {
  id: string;
  text: string;
  status: Status;
};

type ScrumState = {
  todos: ScrumItem[];
};

const initialState: ScrumState = {
  todos: [],
};

export const resetScrum = createAction("scrum/reset");

const scrumSlice = createSlice({
  name: "scrum",
  initialState,
  reducers: {
    addTicket(state, action: PayloadAction<{ id: string; text: string }>) {
      const { id, text } = action.payload;
      state.todos.push({ id, text, status: "todo" });
    },
    toDoing(state, action: PayloadAction<string>) {
      const id = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo && todo.status === "todo") {
        todo.status = "doing";
      }
    },
    toReview(state, action: PayloadAction<string>) {
      const id = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo && todo.status === "doing") {
        todo.status = "review";
      }
    },
    completeTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo && todo.status === "review") {
        todo.status = "done";
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.todos = state.todos.filter((d) => d.id !== id);
    },
  },
  extraReducers(builder) {
    builder.addCase(resetScrum, () => initialState);
  },
});

export const { addTicket, toDoing, toReview, completeTodo, deleteTodo } =
  scrumSlice.actions;
export default scrumSlice.reducer;
