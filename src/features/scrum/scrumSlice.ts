import { createAction, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Status = "todo" | "doing" | "review" | "done";

type ScrumItem = {
  id: string;
  text: string;
  newText?: string;
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
    moveTicket(state, action: PayloadAction<string>) {
      const id = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo && todo.status === "todo") {
        todo.status = "doing";
      } else if (todo && todo.status === "doing") {
        todo.status = "review";
      } else if (todo && todo.status === "review") {
        todo.status = "done";
      }
    },
    returnTicket(state, action: PayloadAction<string>) {
      const id = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo && todo.status === "doing") {
        todo.status = "todo";
      }
      if (todo && todo.status === "review") {
        todo.status = "doing";
      }
      if (todo && todo.status === "done") {
        todo.status = "review";
      }
    },
    deleteTicket(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.todos = state.todos.filter((d) => d.id !== id);
    },
    updateTicket(
      state,
      action: PayloadAction<{ id: string; newText: string }>
    ) {
      const { id, newText } = action.payload;
      const ticket = state.todos.find((t) => t.id === id);
      if (ticket) {
        ticket.text = newText;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(resetScrum, () => initialState);
  },
});

export const {
  addTicket,
  moveTicket,
  returnTicket,
  deleteTicket,
  updateTicket,
} = scrumSlice.actions;
export default scrumSlice.reducer;
