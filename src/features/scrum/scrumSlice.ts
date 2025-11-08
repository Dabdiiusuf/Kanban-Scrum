import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Status = "Backlog" | "Doing" | "Done";

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

const scrumToDo = createSlice({
  name: "scrum",
  initialState,
  reducers: {},
});

export default scrumToDo.reducer;
