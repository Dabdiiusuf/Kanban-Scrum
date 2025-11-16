import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const selectScrumState = (state: RootState) => state.scrum.todos;

export const selectTodo = createSelector([selectScrumState], (todos) =>
  todos.filter((t) => t.status === "todo")
);

export const selectDoing = createSelector([selectScrumState], (todos) =>
  todos.filter((t) => t.status === "doing")
);

export const selectReview = createSelector([selectScrumState], (todos) =>
  todos.filter((t) => t.status === "review")
);

export const selectDone = createSelector([selectScrumState], (todos) =>
  todos.filter((t) => t.status === "done")
);
