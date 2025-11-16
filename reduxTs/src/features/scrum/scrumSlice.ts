import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Status = "todo" | "doing" | "review" | "done";

type ScrumItem = {
  id: string;
  text: string;
  status: Status;
};

type ScrumState = {
  todos: ScrumItem[];
  loading: boolean;
  error: unknown | null;
};

const initialState: ScrumState = {
  todos: [],
  loading: false,
  error: null,
};

export const getScrumTickets = createAsyncThunk("scrum/fetch", async () => {
  const res = await fetch("http://localhost:5000/api/scrumTodo");
  if (!res.ok) throw new Error("Failed to fetch scrum tickets");
  return res.json();
});

export const createScrumTicket = createAsyncThunk(
  "scrum/post",
  async (todo: Omit<ScrumItem, "id">) => {
    const res = await fetch("http://localhost:5000/api/scrumTodo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!res.ok) throw new Error("Failed to create ticket");
    return res.json();
  }
);

export const updateScrumTicket = createAsyncThunk(
  "scrum/update",
  async (todo: ScrumItem) => {
    const res = await fetch(`http://localhost:5000/api/scrumTodo/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (!res.ok) throw new Error("Failed to update ticket");
    return res.json();
  }
);

export const deleteScrumTicket = createAsyncThunk(
  "scrum/delete",
  async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/scrumTodo/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete ticket");
    return id;
  }
);

const scrumSlice = createSlice({
  name: "scrum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getScrumTickets.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getScrumTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch tickets";
    });
    builder.addCase(getScrumTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.todos = action.payload;
    });
    builder.addCase(createScrumTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.todos.push(action.payload);
    });
    builder.addCase(updateScrumTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const ticket = state.todos.find((t) => t.id === action.payload.id);
      if (ticket) {
        ticket.text = action.payload.text;
        ticket.status = action.payload.status;
      }
    });
    builder.addCase(deleteScrumTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    });
  },
});

export const {} = scrumSlice.actions;
export default scrumSlice.reducer;

// export const resetScrum = createAction("scrum/reset");
// builder.addCase(resetScrum, () => initialState);
