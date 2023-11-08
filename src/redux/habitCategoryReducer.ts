import { CategoryRecord, HabitRecord } from "../database/model";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getAll, whereInAnd } from "../database/query";

import db from "../database/database";

export const getHabitCategories = createAsyncThunk(
  "habits/getGroups",
  async () => {
    let categories: CategoryRecord[] = await getAll(db, "habit_category");
    let habits: HabitRecord[] = await whereInAnd(
      db,
      "habit_list",
      "category",
      categories.map((ctg) => ctg.id)
    );
    categories = categories.map((ctg) => {
      let currHabits: any[] = [];
      currHabits = habits.filter((habit) => habit.category == ctg.id);
      currHabits = currHabits.sort(
        (habit: HabitRecord, nextHabit: HabitRecord) => {
          if (typeof habit.order == "number") {
            return typeof nextHabit.order == "number"
              ? habit.order > nextHabit.order
                ? 1
                : -1
              : -1;
          }
          if (typeof nextHabit.order == "number") {
            return typeof habit.order == "number"
              ? habit.order > nextHabit.order
                ? 1
                : -1
              : -1;
          }
          return 1;
        }
      );
      currHabits = currHabits.map((habit: HabitRecord): number => habit.id);
      ctg.habits = currHabits;
      return ctg;
    });
    return categories as CategoryRecord[];
  }
);

export const habitCategoryAdapter = createEntityAdapter<CategoryRecord>();

const initialState = habitCategoryAdapter.getInitialState({
  status: "idle",
  message: "",
});

export const habitCategorySlice = createSlice({
  name: "habitCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHabitCategories.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getHabitCategories.fulfilled, (state, action) => {
      state.status = "ready";
      habitCategoryAdapter.upsertMany(state, action);
    });
    builder.addCase(getHabitCategories.rejected, (state) => {
      state.status = "error";
      state.message = "An error happened while fetching the data!";
    });
  },
});

export default habitCategorySlice.reducer;
