import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Status = "todo" | "doing" | "done";

type TodoItem = {
  id: string;
  text: string;
  status: Status;
};

type TodoState = {
  items: TodoItem[];
  loading: boolean;
  error: unknown | null;
};

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTickets = createAsyncThunk("tickets/id", async () => {
  const res = await fetch("/api/tickets");
  if (!res.ok) throw new Error("Failed to fetch tickets");
  return res.json();
});

export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticket: Omit<TodoItem, "id">) => {
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });
    if (!res.ok) throw new Error("Failed to create ticket");
    return res.json();
  }
);

export const updateTicket = createAsyncThunk(
  "tickets/update",
  async (ticket: TodoItem) => {
    const res = await fetch(`/api/tickets/${ticket.id}`, {
      method: "Patch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });
    if (!res.ok) throw new Error("Failed to update ticket");
    return res.json();
  }
);

export const deleteTicket = createAsyncThunk(
  "tickets/delete",
  async (id: string) => {
    const res = await fetch(`/api/tickets/${id}`, { method: "Delete" });
    if (!res.ok) throw new Error("Failed to delete ticket");
    return id;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "Failed to fetch tickets";
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.items.push(action.payload);
    });
    builder.addCase(updateTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const ticket = state.items.find((t) => t.id === action.payload.id);
      if (ticket) {
        ticket.text = action.payload.text;
        ticket.status = action.payload.status;
      }
    });
    builder.addCase(deleteTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = state.items.filter((t) => t.id !== action.payload);
    });
  },
});

export default todoSlice.reducer;
