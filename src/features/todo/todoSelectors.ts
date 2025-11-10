import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const selectKanbanTodos = (state: RootState) => state.todo.todos;

export const selectTodo = createSelector([selectKanbanTodos], (todos) =>
  todos.filter((t) => t.status === "todo")
);

export const selectDoing = createSelector([selectKanbanTodos], (todos) =>
  todos.filter((t) => t.status === "doing")
);

export const selectDone = createSelector([selectKanbanTodos], (todos) =>
  todos.filter((t) => t.status === "done")
);

export const selectDoingCount = createSelector(
  [selectKanbanTodos],
  (todos) => todos.filter((t) => t.status === "doing").length
);
