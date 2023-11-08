import { CategoryRecord, HabitRecord } from "../database/model";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { getAll, whereInAnd } from "../database/query";

import db from "../database/database";

export const getHabitCategories = createAsyncThunk(
  "categories/getAll",
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

export const getHabitCategoryById = createAsyncThunk(
  "categories/getById",
  async (id: number) => {
    let category: CategoryRecord = await (await db).get("habit_category", id);
    let habits: HabitRecord[] = await whereInAnd(db, "habit_list", "category", [
      id,
    ]);
    habits = habits.sort((habit: HabitRecord, nextHabit: HabitRecord) => {
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
    });
    category.habits = habits.map((habit: HabitRecord): number => habit.id);
    return category as CategoryRecord;
  }
);

export const habitCategoryAdapter = createEntityAdapter<CategoryRecord>();

const initialState = habitCategoryAdapter.getInitialState();

export const habitCategorySlice = createSlice({
  name: "habitCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getHabitCategories.fulfilled,
      habitCategoryAdapter.upsertMany
    );
    builder.addCase(
      getHabitCategoryById.fulfilled,
      habitCategoryAdapter.upsertOne
    );
  },
});

export default habitCategorySlice.reducer;
