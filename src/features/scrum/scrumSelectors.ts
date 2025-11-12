import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const selectScrumTodos = (state: RootState) => state.scrum.todos;

export const selectTodo = createSelector([selectScrumTodos], (todos) =>
  todos.filter((t) => t.status === "todo")
);

export const selectDoing = createSelector([selectScrumTodos], (todos) =>
  todos.filter((t) => t.status === "doing")
);

export const selectReview = createSelector([selectScrumTodos], (todos) =>
  todos.filter((t) => t.status === "review")
);

export const selectDone = createSelector([selectScrumTodos], (todos) =>
  todos.filter((t) => t.status === "done")
);
