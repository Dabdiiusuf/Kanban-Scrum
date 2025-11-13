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
    return res.json;
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
});

export default todoSlice.reducer;
